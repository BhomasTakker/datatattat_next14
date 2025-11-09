import {
	addProviderLookup,
	addFields,
	matchTrust,
	matchLeaning,
	matchOrigin,
	addProviderMatchBeforeLookup,
} from "./aggregator-functions";
import mongoose from "mongoose";

// Mock mongoose ObjectId
jest.mock("mongoose", () => ({
	Types: {
		ObjectId: jest.fn().mockImplementation(() => ({
			toString: () => "507f1f77bcf86cd799439011",
		})),
	},
}));

describe("aggregator-functions", () => {
	let aggregator: any[];

	beforeEach(() => {
		aggregator = [];
	});

	describe("addProviderLookup", () => {
		it("should push a $lookup stage with correct collection name", () => {
			addProviderLookup(aggregator);
			expect(aggregator.length).toBe(1);
			expect(aggregator[0]).toHaveProperty("$lookup");
			expect(aggregator[0].$lookup).toMatchObject({
				from: expect.any(String),
				localField: "provider",
				foreignField: "_id",
				as: "provider",
			});
		});
	});

	describe("addFields", () => {
		it("should push a $addFields stage with score, scoreDetails, and provider", () => {
			addFields(aggregator);
			expect(aggregator.length).toBe(1);
			expect(aggregator[0]).toHaveProperty("$addFields");
			expect(aggregator[0].$addFields).toMatchObject({
				score: { $meta: "searchScore" },
				scoreDetails: { $meta: "searchScoreDetails" },
				provider: { $arrayElemAt: ["$provider", 0] },
			});
		});
	});

	describe("matchTrust", () => {
		it("should not push anything if both trustHigher and trustLower are undefined", () => {
			matchTrust(aggregator, undefined, undefined);
			expect(aggregator.length).toBe(0);
		});

		it("should push a $match stage with correct trust range", () => {
			matchTrust(aggregator, "10", "90");
			expect(aggregator.length).toBe(1);
			expect(aggregator[0]).toHaveProperty("$match");
			expect(aggregator[0].$match.$expr.$and).toEqual([
				{ $gte: ["$provider.rating", 10] },
				{ $lte: ["$provider.rating", 90] },
			]);
		});

		it("should default trustHigher to 0 if not provided", () => {
			matchTrust(aggregator, undefined, "80");
			expect(aggregator[0].$match.$expr.$and[0]).toEqual({
				$gte: ["$provider.rating", 0],
			});
			expect(aggregator[0].$match.$expr.$and[1]).toEqual({
				$lte: ["$provider.rating", 80],
			});
		});

		it("should default trustLower to 100 if not provided", () => {
			matchTrust(aggregator, "20", undefined);
			expect(aggregator[0].$match.$expr.$and[0]).toEqual({
				$gte: ["$provider.rating", 20],
			});
			expect(aggregator[0].$match.$expr.$and[1]).toEqual({
				$lte: ["$provider.rating", 100],
			});
		});
	});

	describe("matchLeaning", () => {
		it("should not push anything if both leaningHigher and leaningLower are undefined", () => {
			matchLeaning(aggregator, undefined, undefined);
			expect(aggregator.length).toBe(0);
		});

		it("should push a $match stage with correct leaning range", () => {
			matchLeaning(aggregator, "-0.5", "0.5");
			expect(aggregator.length).toBe(1);
			expect(aggregator[0].$match.$expr.$and).toEqual([
				{ $gte: ["$provider.leaning", -0.5] },
				{ $lte: ["$provider.leaning", 0.5] },
			]);
		});

		it("should default leaningHigher to -1 if not provided", () => {
			matchLeaning(aggregator, undefined, "0.7");
			expect(aggregator[0].$match.$expr.$and[0]).toEqual({
				$gte: ["$provider.leaning", -1],
			});
			expect(aggregator[0].$match.$expr.$and[1]).toEqual({
				$lte: ["$provider.leaning", 0.7],
			});
		});

		it("should default leaningLower to 1 if not provided", () => {
			matchLeaning(aggregator, "0.2", undefined);
			expect(aggregator[0].$match.$expr.$and[0]).toEqual({
				$gte: ["$provider.leaning", 0.2],
			});
			expect(aggregator[0].$match.$expr.$and[1]).toEqual({
				$lte: ["$provider.leaning", 1],
			});
		});
	});

	describe("matchOrigin", () => {
		it("should not push anything if origin is undefined", () => {
			matchOrigin(aggregator, undefined);
			expect(aggregator.length).toBe(0);
		});

		it("should push a $match stage with correct origin", () => {
			matchOrigin(aggregator, "US");
			expect(aggregator.length).toBe(1);
			expect(aggregator[0]).toHaveProperty("$match");
			expect(aggregator[0].$match.$expr.$and).toEqual([
				{ $eq: ["$provider.origin", "US"] },
			]);
		});
	});

	describe("addProviderMatchBeforeLookup", () => {
		it("should not push anything if providerObjectIds is undefined", () => {
			addProviderMatchBeforeLookup(aggregator, undefined);
			expect(aggregator.length).toBe(0);
		});

		it("should push a $match stage with single ObjectId", () => {
			const objectId = new mongoose.Types.ObjectId();
			addProviderMatchBeforeLookup(aggregator, objectId);
			expect(aggregator.length).toBe(1);
			expect(aggregator[0]).toHaveProperty("$match");
			expect(aggregator[0].$match.provider).toEqual(objectId);
		});

		it("should push a $match stage with single ObjectId in array", () => {
			const objectId = new mongoose.Types.ObjectId();
			addProviderMatchBeforeLookup(aggregator, [objectId]);
			expect(aggregator.length).toBe(1);
			expect(aggregator[0]).toHaveProperty("$match");
			expect(aggregator[0].$match.provider).toEqual(objectId);
		});

		it("should push a $match stage with $in for multiple ObjectIds", () => {
			const objectId1 = new mongoose.Types.ObjectId();
			const objectId2 = new mongoose.Types.ObjectId();
			const objectId3 = new mongoose.Types.ObjectId();
			addProviderMatchBeforeLookup(aggregator, [
				objectId1,
				objectId2,
				objectId3,
			]);
			expect(aggregator.length).toBe(1);
			expect(aggregator[0]).toHaveProperty("$match");
			expect(aggregator[0].$match.provider).toEqual({
				$in: [objectId1, objectId2, objectId3],
			});
		});

		it("should handle empty array", () => {
			addProviderMatchBeforeLookup(aggregator, []);
			expect(aggregator.length).toBe(0);
		});
	});
});
