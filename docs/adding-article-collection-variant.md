# Adding a New ArticleCollection Variant

This document describes the steps required to scaffold and implement a new `ArticleCollection` display variant. Follow the steps in order — steps 1–6 are pure scaffolding (no real component logic) and can be completed and verified before any UI work begins.

---

## File Map

All paths are relative to `src/`.

| Role              | Path pattern                                                                       |
| ----------------- | ---------------------------------------------------------------------------------- |
| Variant enum      | `components/content/components/article-collection/variants.ts`                     |
| Variant map       | `components/content/components/article-collection/variant-map.ts`                  |
| Variant module    | `components/content/components/article-collection/collections/[name]/`             |
| Edit config entry | `components/edit/config/components/article-collection/collections/stack/[name].ts` |
| Edit structs map  | `components/edit/config/components/article-collection/structs.ts`                  |

---

## Step 1 — Add to the variants enum

**File:** `components/content/components/article-collection/variants.ts`

Add a new entry to `ArticleCollectionVariants`. The string value becomes the `variantType` stored in the database and used as the map key everywhere.

```ts
export enum ArticleCollectionVariants {
	// ...existing entries...
	MyVariant = "my-variant", // ← add this
}
```

---

## Step 2 — Create the variant folder

Create a new folder: `components/content/components/article-collection/collections/[name]/`

The folder must contain these four files:

### `[name].module.scss`

Styles for the rendered component. Start with a minimal `.root {}` rule.

```scss
.root {
}
```

### `template.module.scss`

Styles for the editor preview skeleton. Start with a minimal `.template {}` rule.

```scss
.template {
}
```

### `template.tsx`

Editor preview placeholder. Rendered when the component is shown as a template/skeleton in the edit UI.

```tsx
import styles from "./template.module.scss";

export const MyVariantTemplate = () => {
	return <div className={styles.template} />;
};
```

### `[name].tsx`

The variant module. Must export a default object with three keys: `styles`, `renderMethod`, and `renderTemplate`.

During scaffolding, `renderMethod` can return `null` and `renderTemplate` can return the template placeholder. The real implementation goes here later.

```tsx
import styles from "./[name].module.scss";
import { UnknownObject } from "@/types/utils";
import { ArticleRenderProps } from "../types";
import { MyVariantTemplate } from "./template";

const renderMethod = (
	_articles: ArticleRenderProps[] = [],
	_: UnknownObject,
) => {
	return <div className={styles.root} />;
};

const renderTemplate = (_: UnknownObject) => {
	return <MyVariantTemplate />;
};

const myVariant = {
	styles,
	renderMethod,
	renderTemplate,
};

export default myVariant;
```

---

## Step 3 — Register in the variant map

**File:** `components/content/components/article-collection/variant-map.ts`

1. Import the new variant module.
2. Add it to the `Variants` union type.
3. Add an entry to `VariantsMap`.

```ts
import myVariant from "./collections/[name]/[name]";

type Variants =
	| typeof stackScroller
	// ...existing entries...
	| typeof myVariant; // ← add to union

export const VariantsMap = new Map<ArticleCollectionVariants, Variants>([
	// ...existing entries...
	[ArticleCollectionVariants.MyVariant, myVariant], // ← add entry
]);
```

---

## Step 4 — Create the edit config entry

**New file:** `components/edit/config/components/article-collection/collections/stack/[name].ts`

This defines the inputs shown in the editor when this variant is selected. For variants that use a standard article query (RSS/API), copy `stack-scroller.ts` and update `id` and `label`.

```ts
import { getWithConfig } from "@/components/edit/config/query/_with-config";
import { APIOptions } from "@/components/edit/config/query/api/api-base-config";
import { ARTICLE_OPTIONS } from "@/components/edit/config/query/types";
import { EditInputs } from "@/components/edit/inputs/inputs";
import { InputListProps } from "@/types/edit/inputs/inputs";

export const MY_VARIANT_CONFIG: InputListProps = {
	id: "myVariant",
	type: EditInputs.inputList,
	label: "My Variant Label",
	inputs: [
		getWithConfig({
			options: ARTICLE_OPTIONS,
			apiConfigOptions: {
				options: [APIOptions.ARTICLES_SEARCH_API, APIOptions.YOUTUBE_API],
				defaultSelection: APIOptions.ARTICLES_SEARCH_API,
			},
		}),
	],
};
```

If the variant requires additional editor inputs (e.g. a count selector, a flag), add them to the `inputs` array alongside `getWithConfig(...)`.

---

## Step 5 — Register in the edit structs map

**File:** `components/edit/config/components/article-collection/structs.ts`

1. Import the new config.
2. Add it to the `articleCollectionsMap`.

```ts
import { MY_VARIANT_CONFIG } from "./collections/stack/[name]";

export const articleCollectionsMap = new Map<string, articleCollectionProps>([
	// ...existing entries...
	[ArticleCollectionVariants.MyVariant, MY_VARIANT_CONFIG], // ← add entry
]);
```

---

## Step 6 — Verify the scaffold

At this point the variant should:

- Appear in the "Article Collection Variant" dropdown in the editor
- Be selectable and saveable without errors
- Render an empty `<div>` on the page (not `null`, not a crash)

Run the dev server and confirm before continuing to implementation.

---

## Step 7 — Implement `renderMethod`

Replace the placeholder `renderMethod` in `[name].tsx` with the real component logic.

Key utilities available:

| Utility             | Import                                   | Purpose                                      |
| ------------------- | ---------------------------------------- | -------------------------------------------- |
| `Article`           | `../../article/article`                  | Renders a full article card                  |
| `InViewComponent`   | `@/components/ui/in-view/in-view`        | Lazy-renders when scrolled into view         |
| `WithData`          | `@/components/ui/with-data/with-data`    | Async data fetcher with loading state        |
| `Interaction`       | `../../article/interaction/interactions` | Wraps content in a navigation click handler  |
| `articleMetaLoader` | `../utils`                               | Returns async getter for article metadata    |
| `articleRenderer`   | `../utils`                               | Returns JSX renderer callback for `WithData` |
| `articleTemplate`   | `../utils`                               | Returns loading skeleton for `WithData`      |

A typical article card render follows this pattern:

```tsx
const renderArticle = (item: ArticleRenderProps) => {
	const template = articleTemplate(styles);
	return (
		<InViewComponent
			key={item.src}
			options={{ threshold: 0, triggerOnce: true }}
			template={template}
		>
			<Interaction type={InteractionsOptions.Navigate} href={item.src || ""}>
				<WithData
					getter={articleMetaLoader(item)}
					callback={articleRenderer(styles)}
					template={template}
				/>
			</Interaction>
		</InViewComponent>
	);
};
```

---

## Step 8 — Implement `renderTemplate`

Replace the placeholder `renderTemplate` with a meaningful editor skeleton. The template is shown in the edit UI when a user adds this component type. It should visually suggest the layout without real data.

See `stack-columns/template.tsx` and `grid-display/template.tsx` for examples.

---

## Step 9 — Add styles

Fill in `[name].module.scss` with the layout styles. Article mixin helpers are available:

```scss
@use "../../article/mixins/" as article;
@use "../../../../../../scss/abstracts/units/" as *;
@use "../../../../../../scss/mixins/ui/" as ui;
```

---

## Step 10 — Tests

Create `[name].test.tsx` in the variant folder. At minimum:

- Render with an empty articles array — assert no crash
- Render with fixture articles — assert expected output (date headings, article count, etc.)
- Snapshot test for the template component

---

## Checklist

- [ ] Enum entry added (`variants.ts`)
- [ ] Variant folder created with all four files
- [ ] Variant registered in `variant-map.ts`
- [ ] Edit config file created
- [ ] Edit config registered in `structs.ts`
- [ ] Scaffold verified in browser (variant appears in dropdown, renders without error)
- [ ] `renderMethod` implemented
- [ ] `renderTemplate` implemented
- [ ] Styles written
- [ ] Tests written
