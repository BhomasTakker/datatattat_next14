import { HeaderNav } from "@/types/header";
import { NavItemInput } from "./nav-item-input";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useSearchParams } from "next/navigation";

// Create a context - this is getting too busy
// and a little logic heavy
export const NavList = ({ links }: { links: HeaderNav }) => {
	const [navLinks, setNavLinks] = useState<HeaderNav>([]);
	const { unregister, setValue, getValues } = useFormContext();
	const searchParams = useSearchParams();

	const route = searchParams.get("route") || "/";

	// Using links directly as a prop
	// Would not update when props chanegd :/
	useEffect(() => {
		setNavLinks(links || []);
	}, [links]);

	// potentially create a context provider
	const onMove = (index: number, direction: string) => {
		// protect against moving out of bounds
		if (index === 0 && direction === "up") return;
		if (index === navLinks.length - 1 && direction === "down") return;

		const newIndex = direction === "up" ? index - 1 : index + 1;
		// const toSwap = navLinks[newIndex];

		// Needd to do this in order to keep the values accurate
		const toMoveRoute = getValues(`header-${index}-route`);
		const toMoveLabel = getValues(`header-${index}-label`);
		const toSwapRoute = getValues(`header-${newIndex}-route`);
		const toSwapLabel = getValues(`header-${newIndex}-label`);

		const toMove = { label: toMoveLabel, route: toMoveRoute };

		// Swap the values
		setValue(`header-${index}-label`, toSwapLabel);
		setValue(`header-${index}-route`, toSwapRoute);
		setValue(`header-${newIndex}-label`, toMoveLabel);
		setValue(`header-${newIndex}-route`, toMoveRoute);

		// We need to update nav links
		// because we are not using the form context
		// whereas if we were using an array of objects
		// we could just swap the values
		setNavLinks((prev) => {
			const newLinks = [...prev];
			newLinks.splice(index, 1);
			newLinks.splice(newIndex, 0, toMove);

			return newLinks;
		});
	};
	const onDelete = (index: number) => {
		const newItems = [...navLinks];

		for (let i = index; i < navLinks.length; i++) {
			const isLastItem = i === navLinks.length - 1;
			if (isLastItem) {
				// unsetting is probably not required here
				setValue(`header-${i}-label`, "");
				setValue(`header-${i}-route`, "");

				// unregister only works in conunction with shouldUnregister
				unregister([`header-${i}-label`, `header-${i}-route`]);
				continue;
			}
			const label = getValues(`header-${i + 1}-label`);
			const route = getValues(`header-${i + 1}-route`);
			newItems[i] = { label, route };
			setValue(`header-${i}-label`, label);
			setValue(`header-${i}-route`, route);
		}

		setNavLinks(newItems.slice(0, newItems.length - 1));
	};

	const onAdd = () => {
		// Add a new link
		// create some starting text - route should be i.e. /new-test/
		const newLink = { label: "", route: route };
		setValue(`header-${navLinks.length}-label`, newLink.label);
		setValue(`header-${navLinks.length}-route`, newLink.route);
		setNavLinks((prev) => [...prev, newLink]);
	};

	const linksArray = navLinks.map((link, index) => {
		return (
			<NavItemInput
				key={`${link.label}-${link.route}`}
				link={link}
				index={index}
				onMove={onMove}
				onDelete={onDelete}
			/>
		);
	});

	return (
		<section>
			{linksArray}
			<Button onClick={() => onAdd()}>
				<FaPlus />
				Add
			</Button>
		</section>
	);
};
