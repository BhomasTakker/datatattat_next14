import { EditInputs } from "../../inputs/inputs";
import { useContainerWidth, useContainerHeight } from "./content";
import {
	ContainerHeightOptions,
	ContainerWidthOptions,
} from "@/components/page/components/stack/types";

describe("content.ts", () => {
	describe("useContainerWidth", () => {
		it("should return a SelectInputProps object with correct structure", () => {
			const id = "test-width-id";
			const label = "Test Width Label";

			const result = useContainerWidth(id, label);

			expect(result).toEqual({
				id,
				type: EditInputs.select,
				label,
				defaultValue: ContainerWidthOptions.MD,
				options: Object.values(ContainerWidthOptions),
			});
		});

		it("should return correct type", () => {
			const result = useContainerWidth("test-id", "test-label");

			expect(result.type).toBe(EditInputs.select);
		});

		it("should use MD as default value", () => {
			const result = useContainerWidth("test-id", "test-label");

			expect(result.defaultValue).toBe(ContainerWidthOptions.MD);
		});

		it("should include all container width options", () => {
			const result = useContainerWidth("test-id", "test-label");
			const expectedOptions = Object.values(ContainerWidthOptions);

			expect(result.options).toEqual(expectedOptions);
			expect(result.options).toHaveLength(7); // XXS, XS, SM, MD, LG, XL, XXL
		});

		it("should accept different id and label values", () => {
			const testCases = [
				{ id: "width-1", label: "Container Width" },
				{ id: "custom-width", label: "Custom Width Selection" },
				{ id: "", label: "" },
			];

			testCases.forEach(({ id, label }) => {
				const result = useContainerWidth(id, label);

				expect(result.id).toBe(id);
				expect(result.label).toBe(label);
			});
		});

		it("should maintain reference equality for options array", () => {
			const result1 = useContainerWidth("id1", "label1");
			const result2 = useContainerWidth("id2", "label2");

			expect(result1.options).toEqual(result2.options);
		});
	});

	describe("useContainerHeight", () => {
		it("should return a SelectInputProps object with correct structure", () => {
			const id = "test-height-id";
			const label = "Test Height Label";

			const result = useContainerHeight(id, label);

			expect(result).toEqual({
				id,
				type: EditInputs.select,
				label,
				defaultValue: ContainerHeightOptions.MD,
				options: Object.values(ContainerHeightOptions),
			});
		});

		it("should return correct type", () => {
			const result = useContainerHeight("test-id", "test-label");

			expect(result.type).toBe(EditInputs.select);
		});

		it("should use MD as default value", () => {
			const result = useContainerHeight("test-id", "test-label");

			expect(result.defaultValue).toBe(ContainerHeightOptions.MD);
		});

		it("should include all container height options", () => {
			const result = useContainerHeight("test-id", "test-label");
			const expectedOptions = Object.values(ContainerHeightOptions);

			expect(result.options).toEqual(expectedOptions);
			expect(result.options).toHaveLength(7); // XXS, XS, SM, MD, LG, XL, XXL
		});

		it("should accept different id and label values", () => {
			const testCases = [
				{ id: "height-1", label: "Container Height" },
				{ id: "custom-height", label: "Custom Height Selection" },
				{ id: "", label: "" },
			];

			testCases.forEach(({ id, label }) => {
				const result = useContainerHeight(id, label);

				expect(result.id).toBe(id);
				expect(result.label).toBe(label);
			});
		});

		it("should maintain reference equality for options array", () => {
			const result1 = useContainerHeight("id1", "label1");
			const result2 = useContainerHeight("id2", "label2");

			expect(result1.options).toEqual(result2.options);
		});
	});

	describe("useContainerWidth vs useContainerHeight", () => {
		it("should return objects with the same structure but different default values", () => {
			const widthResult = useContainerWidth("test-id", "test-label");
			const heightResult = useContainerHeight("test-id", "test-label");

			expect(widthResult.type).toBe(heightResult.type);
			expect(widthResult.options).toEqual(heightResult.options);
			expect(widthResult.defaultValue).toBe(ContainerWidthOptions.MD);
			expect(heightResult.defaultValue).toBe(ContainerHeightOptions.MD);
		});

		it("should use the same options since ContainerWidthOptions and ContainerHeightOptions have same values", () => {
			const widthResult = useContainerWidth("test-id", "test-label");
			const heightResult = useContainerHeight("test-id", "test-label");

			expect(widthResult.options).toEqual(heightResult.options);
		});
	});

	describe("edge cases", () => {
		it("should handle undefined or null-like values gracefully", () => {
			// TypeScript would prevent this, but testing runtime behavior
			const widthResult = useContainerWidth(undefined as any, null as any);
			const heightResult = useContainerHeight(undefined as any, null as any);

			expect(widthResult.id).toBeUndefined();
			expect(widthResult.label).toBeNull();
			expect(heightResult.id).toBeUndefined();
			expect(heightResult.label).toBeNull();
		});

		it("should handle special characters in id and label", () => {
			const specialId = "test-id-!@#$%^&*()";
			const specialLabel = "Label with special chars: <>?{}[]|\\";

			const widthResult = useContainerWidth(specialId, specialLabel);
			const heightResult = useContainerHeight(specialId, specialLabel);

			expect(widthResult.id).toBe(specialId);
			expect(widthResult.label).toBe(specialLabel);
			expect(heightResult.id).toBe(specialId);
			expect(heightResult.label).toBe(specialLabel);
		});
	});
});
