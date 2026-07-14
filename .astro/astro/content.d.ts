declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"7-day-indian-perimenopause-meal-plan.md": {
	id: "7-day-indian-perimenopause-meal-plan.md";
  slug: "7-day-indian-perimenopause-meal-plan";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"anovulation-perimenopause-link.md": {
	id: "anovulation-perimenopause-link.md";
  slug: "anovulation-perimenopause-link";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"anovulation-perimenopause.md": {
	id: "anovulation-perimenopause.md";
  slug: "anovulation-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"are-blood-clots-during-period-normal.md": {
	id: "are-blood-clots-during-period-normal.md";
  slug: "are-blood-clots-during-period-normal";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"balancing-hormones-perimenopause-pregnancy.md": {
	id: "balancing-hormones-perimenopause-pregnancy.md";
  slug: "balancing-hormones-perimenopause-pregnancy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"best-exercise-for-perimenopause.md": {
	id: "best-exercise-for-perimenopause.md";
  slug: "best-exercise-for-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"blood-clots-periods-perimenopause.md": {
	id: "blood-clots-periods-perimenopause.md";
  slug: "blood-clots-periods-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"body-odour-changes-perimenopause.md": {
	id: "body-odour-changes-perimenopause.md";
  slug: "body-odour-changes-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"can-i-get-pregnant-during-perimenopause.md": {
	id: "can-i-get-pregnant-during-perimenopause.md";
  slug: "can-i-get-pregnant-during-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"can-perimenopause-cause-acne.md": {
	id: "can-perimenopause-cause-acne.md";
  slug: "can-perimenopause-cause-acne";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"can-perimenopause-cause-back-pain.md": {
	id: "can-perimenopause-cause-back-pain.md";
  slug: "can-perimenopause-cause-back-pain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"can-perimenopause-cause-bloating.md": {
	id: "can-perimenopause-cause-bloating.md";
  slug: "can-perimenopause-cause-bloating";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"can-perimenopause-cause-breathing-problems.md": {
	id: "can-perimenopause-cause-breathing-problems.md";
  slug: "can-perimenopause-cause-breathing-problems";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"can-perimenopause-cause-depression.md": {
	id: "can-perimenopause-cause-depression.md";
  slug: "can-perimenopause-cause-depression";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"can-perimenopause-cause-dizziness.md": {
	id: "can-perimenopause-cause-dizziness.md";
  slug: "can-perimenopause-cause-dizziness";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"can-perimenopause-cause-high-blood-pressure.md": {
	id: "can-perimenopause-cause-high-blood-pressure.md";
  slug: "can-perimenopause-cause-high-blood-pressure";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"can-perimenopause-cause-water-retention.md": {
	id: "can-perimenopause-cause-water-retention.md";
  slug: "can-perimenopause-cause-water-retention";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"clumsiness-coordination-perimenopause.md": {
	id: "clumsiness-coordination-perimenopause.md";
  slug: "clumsiness-coordination-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"cold-flashes-chills-perimenopause.md": {
	id: "cold-flashes-chills-perimenopause.md";
  slug: "cold-flashes-chills-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"coping-emotionally-perimenopause.md": {
	id: "coping-emotionally-perimenopause.md";
  slug: "coping-emotionally-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"does-perimenopause-cause-water-retention.md": {
	id: "does-perimenopause-cause-water-retention.md";
  slug: "does-perimenopause-cause-water-retention";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"does-perimenopause-make-you-hornier.md": {
	id: "does-perimenopause-make-you-hornier.md";
  slug: "does-perimenopause-make-you-hornier";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"dry-itchy-eyes-perimenopause.md": {
	id: "dry-itchy-eyes-perimenopause.md";
  slug: "dry-itchy-eyes-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"early-premature-menopause-before-45.md": {
	id: "early-premature-menopause-before-45.md";
  slug: "early-premature-menopause-before-45";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"egg-freezing-during-perimenopause.md": {
	id: "egg-freezing-during-perimenopause.md";
  slug: "egg-freezing-during-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"electric-shock-sensations-perimenopause.md": {
	id: "electric-shock-sensations-perimenopause.md";
  slug: "electric-shock-sensations-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"facial-hair-chin-hair-perimenopause.md": {
	id: "facial-hair-chin-hair-perimenopause.md";
  slug: "facial-hair-chin-hair-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"false-positive-pregnancy-test-perimenopause.md": {
	id: "false-positive-pregnancy-test-perimenopause.md";
  slug: "false-positive-pregnancy-test-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"first-signs-of-perimenopause.md": {
	id: "first-signs-of-perimenopause.md";
  slug: "first-signs-of-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"foods-to-avoid-during-perimenopause.md": {
	id: "foods-to-avoid-during-perimenopause.md";
  slug: "foods-to-avoid-during-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"formication-crawling-skin-perimenopause.md": {
	id: "formication-crawling-skin-perimenopause.md";
  slug: "formication-crawling-skin-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"frequent-periods-every-two-weeks-perimenopause.md": {
	id: "frequent-periods-every-two-weeks-perimenopause.md";
  slug: "frequent-periods-every-two-weeks-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"frozen-shoulder-perimenopause.md": {
	id: "frozen-shoulder-perimenopause.md";
  slug: "frozen-shoulder-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"get-doctor-take-perimenopause-seriously.md": {
	id: "get-doctor-take-perimenopause-seriously.md";
  slug: "get-doctor-take-perimenopause-seriously";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"heart-health-after-menopause-india.md": {
	id: "heart-health-after-menopause-india.md";
  slug: "heart-health-after-menopause-india";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"heart-palpitations-perimenopause.md": {
	id: "heart-palpitations-perimenopause.md";
  slug: "heart-palpitations-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"heavy-periods-perimenopause-treatment.md": {
	id: "heavy-periods-perimenopause-treatment.md";
  slug: "heavy-periods-perimenopause-treatment";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hormonal-headaches-migraines-perimenopause.md": {
	id: "hormonal-headaches-migraines-perimenopause.md";
  slug: "hormonal-headaches-migraines-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hormonal-symptom-treatments-perimenopause.md": {
	id: "hormonal-symptom-treatments-perimenopause.md";
  slug: "hormonal-symptom-treatments-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hormone-fluctuations-perimenopause.md": {
	id: "hormone-fluctuations-perimenopause.md";
  slug: "hormone-fluctuations-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hormone-replacement-therapy-after-menopause.md": {
	id: "hormone-replacement-therapy-after-menopause.md";
  slug: "hormone-replacement-therapy-after-menopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-long-does-perimenopause-last.md": {
	id: "how-long-does-perimenopause-last.md";
  slug: "how-long-does-perimenopause-last";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-long-heavy-periods-perimenopause.md": {
	id: "how-long-heavy-periods-perimenopause.md";
  slug: "how-long-heavy-periods-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-long-hormonal-fluctuations-perimenopause.md": {
	id: "how-long-hormonal-fluctuations-perimenopause.md";
  slug: "how-long-hormonal-fluctuations-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-test-for-perimenopause.md": {
	id: "how-to-test-for-perimenopause.md";
  slug: "how-to-test-for-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-track-perimenopause-symptom-diary.md": {
	id: "how-to-track-perimenopause-symptom-diary.md";
  slug: "how-to-track-perimenopause-symptom-diary";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"how-to-treat-vaginal-dryness.md": {
	id: "how-to-treat-vaginal-dryness.md";
  slug: "how-to-treat-vaginal-dryness";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"indian-diet-perimenopause.md": {
	id: "indian-diet-perimenopause.md";
  slug: "indian-diet-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"insomnia-sleep-problems-perimenopause.md": {
	id: "insomnia-sleep-problems-perimenopause.md";
  slug: "insomnia-sleep-problems-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"interpret-perimenopause-hormone-graph.md": {
	id: "interpret-perimenopause-hormone-graph.md";
  slug: "interpret-perimenopause-hormone-graph";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"is-hrt-safe-benefits-risks.md": {
	id: "is-hrt-safe-benefits-risks.md";
  slug: "is-hrt-safe-benefits-risks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"is-spotting-common-in-perimenopause.md": {
	id: "is-spotting-common-in-perimenopause.md";
  slug: "is-spotting-common-in-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"joint-pain-muscle-aches-perimenopause.md": {
	id: "joint-pain-muscle-aches-perimenopause.md";
  slug: "joint-pain-muscle-aches-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"lifestyle-changes-perimenopause-symptoms.md": {
	id: "lifestyle-changes-perimenopause-symptoms.md";
  slug: "lifestyle-changes-perimenopause-symptoms";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"low-oestrogen-symptoms-perimenopause.md": {
	id: "low-oestrogen-symptoms-perimenopause.md";
  slug: "low-oestrogen-symptoms-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"low-progesterone-symptoms-perimenopause.md": {
	id: "low-progesterone-symptoms-perimenopause.md";
  slug: "low-progesterone-symptoms-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"manage-perimenopause-naturally.md": {
	id: "manage-perimenopause-naturally.md";
  slug: "manage-perimenopause-naturally";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"metallic-taste-burning-mouth-perimenopause.md": {
	id: "metallic-taste-burning-mouth-perimenopause.md";
  slug: "metallic-taste-burning-mouth-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"natural-remedies-perimenopause-anxiety.md": {
	id: "natural-remedies-perimenopause-anxiety.md";
  slug: "natural-remedies-perimenopause-anxiety";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"natural-remedies-perimenopause-brain-fog.md": {
	id: "natural-remedies-perimenopause-brain-fog.md";
  slug: "natural-remedies-perimenopause-brain-fog";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"natural-remedies-perimenopause-depression.md": {
	id: "natural-remedies-perimenopause-depression.md";
  slug: "natural-remedies-perimenopause-depression";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"natural-remedies-perimenopause-fatigue.md": {
	id: "natural-remedies-perimenopause-fatigue.md";
  slug: "natural-remedies-perimenopause-fatigue";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"natural-remedies-perimenopause-hair-loss.md": {
	id: "natural-remedies-perimenopause-hair-loss.md";
  slug: "natural-remedies-perimenopause-hair-loss";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"natural-remedies-perimenopause-heavy-bleeding.md": {
	id: "natural-remedies-perimenopause-heavy-bleeding.md";
  slug: "natural-remedies-perimenopause-heavy-bleeding";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"natural-remedies-perimenopause-hot-flashes.md": {
	id: "natural-remedies-perimenopause-hot-flashes.md";
  slug: "natural-remedies-perimenopause-hot-flashes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"natural-remedies-perimenopause-mood-swings.md": {
	id: "natural-remedies-perimenopause-mood-swings.md";
  slug: "natural-remedies-perimenopause-mood-swings";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"natural-remedies-perimenopause-weight-gain.md": {
	id: "natural-remedies-perimenopause-weight-gain.md";
  slug: "natural-remedies-perimenopause-weight-gain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"natural-remedies-perimenopause.md": {
	id: "natural-remedies-perimenopause.md";
  slug: "natural-remedies-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"nausea-perimenopause.md": {
	id: "nausea-perimenopause.md";
  slug: "nausea-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"oestrogen-rich-foods-menopause.md": {
	id: "oestrogen-rich-foods-menopause.md";
  slug: "oestrogen-rich-foods-menopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"oestrogen-vs-progesterone-perimenopause.md": {
	id: "oestrogen-vs-progesterone-perimenopause.md";
  slug: "oestrogen-vs-progesterone-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"ovulation-during-perimenopause.md": {
	id: "ovulation-during-perimenopause.md";
  slug: "ovulation-during-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"partners-guide-to-perimenopause.md": {
	id: "partners-guide-to-perimenopause.md";
  slug: "partners-guide-to-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopausal-bleeding-evaluation-tests.md": {
	id: "perimenopausal-bleeding-evaluation-tests.md";
  slug: "perimenopausal-bleeding-evaluation-tests";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-abdominal-pain.md": {
	id: "perimenopause-abdominal-pain.md";
  slug: "perimenopause-abdominal-pain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-age-india.md": {
	id: "perimenopause-age-india.md";
  slug: "perimenopause-age-india";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-allergy-flare-ups.md": {
	id: "perimenopause-allergy-flare-ups.md";
  slug: "perimenopause-allergy-flare-ups";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-and-alcohol.md": {
	id: "perimenopause-and-alcohol.md";
  slug: "perimenopause-and-alcohol";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-and-pcos.md": {
	id: "perimenopause-and-pcos.md";
  slug: "perimenopause-and-pcos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-anxiety-mood-swings.md": {
	id: "perimenopause-anxiety-mood-swings.md";
  slug: "perimenopause-anxiety-mood-swings";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-anxiety-triggers-easily.md": {
	id: "perimenopause-anxiety-triggers-easily.md";
  slug: "perimenopause-anxiety-triggers-easily";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-breast-pain.md": {
	id: "perimenopause-breast-pain.md";
  slug: "perimenopause-breast-pain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-breast-tenderness.md": {
	id: "perimenopause-breast-tenderness.md";
  slug: "perimenopause-breast-tenderness";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-ear-pain.md": {
	id: "perimenopause-ear-pain.md";
  slug: "perimenopause-ear-pain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-flushed-cheeks.md": {
	id: "perimenopause-flushed-cheeks.md";
  slug: "perimenopause-flushed-cheeks";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-heavy-bleeding-extreme-hunger.md": {
	id: "perimenopause-heavy-bleeding-extreme-hunger.md";
  slug: "perimenopause-heavy-bleeding-extreme-hunger";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-hip-pain.md": {
	id: "perimenopause-hip-pain.md";
  slug: "perimenopause-hip-pain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-joint-pain.md": {
	id: "perimenopause-joint-pain.md";
  slug: "perimenopause-joint-pain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-nipple-pain.md": {
	id: "perimenopause-nipple-pain.md";
  slug: "perimenopause-nipple-pain";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-painful-ovulation.md": {
	id: "perimenopause-painful-ovulation.md";
  slug: "perimenopause-painful-ovulation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-sex-painful-intercourse.md": {
	id: "perimenopause-sex-painful-intercourse.md";
  slug: "perimenopause-sex-painful-intercourse";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-skin-ageing-dryness-collagen.md": {
	id: "perimenopause-skin-ageing-dryness-collagen.md";
  slug: "perimenopause-skin-ageing-dryness-collagen";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-stories-support-community.md": {
	id: "perimenopause-stories-support-community.md";
  slug: "perimenopause-stories-support-community";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-symptoms-30s.md": {
	id: "perimenopause-symptoms-30s.md";
  slug: "perimenopause-symptoms-30s";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-symptoms-40s.md": {
	id: "perimenopause-symptoms-40s.md";
  slug: "perimenopause-symptoms-40s";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-symptoms-45-50.md": {
	id: "perimenopause-symptoms-45-50.md";
  slug: "perimenopause-symptoms-45-50";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-symptoms-between-periods.md": {
	id: "perimenopause-symptoms-between-periods.md";
  slug: "perimenopause-symptoms-between-periods";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-thyroid-difference.md": {
	id: "perimenopause-thyroid-difference.md";
  slug: "perimenopause-thyroid-difference";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-vaginal-dryness.md": {
	id: "perimenopause-vaginal-dryness.md";
  slug: "perimenopause-vaginal-dryness";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-vs-menopause-difference.md": {
	id: "perimenopause-vs-menopause-difference.md";
  slug: "perimenopause-vs-menopause-difference";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-weight-gain-belly-fat.md": {
	id: "perimenopause-weight-gain-belly-fat.md";
  slug: "perimenopause-weight-gain-belly-fat";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"perimenopause-working-women-india.md": {
	id: "perimenopause-working-women-india.md";
  slug: "perimenopause-working-women-india";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"prepare-bones-perimenopause.md": {
	id: "prepare-bones-perimenopause.md";
  slug: "prepare-bones-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"reliable-information-menopause-perimenopause.md": {
	id: "reliable-information-menopause-perimenopause.md";
  slug: "reliable-information-menopause-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"restless-legs-perimenopause.md": {
	id: "restless-legs-perimenopause.md";
  slug: "restless-legs-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"seven-signs-of-perimenopause.md": {
	id: "seven-signs-of-perimenopause.md";
  slug: "seven-signs-of-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"should-i-take-estrogen-perimenopause.md": {
	id: "should-i-take-estrogen-perimenopause.md";
  slug: "should-i-take-estrogen-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"signs-perimenopause-starting.md": {
	id: "signs-perimenopause-starting.md";
  slug: "signs-perimenopause-starting";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"supplements-for-perimenopause.md": {
	id: "supplements-for-perimenopause.md";
  slug: "supplements-for-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"surgical-menopause-hysterectomy.md": {
	id: "surgical-menopause-hysterectomy.md";
  slug: "surgical-menopause-hysterectomy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"talking-to-husband-perimenopause-india.md": {
	id: "talking-to-husband-perimenopause-india.md";
  slug: "talking-to-husband-perimenopause-india";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tinnitus-ringing-ears-perimenopause.md": {
	id: "tinnitus-ringing-ears-perimenopause.md";
  slug: "tinnitus-ringing-ears-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"urinary-symptoms-perimenopause.md": {
	id: "urinary-symptoms-perimenopause.md";
  slug: "urinary-symptoms-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vaginal-atrophy-atrophic-vaginitis.md": {
	id: "vaginal-atrophy-atrophic-vaginitis.md";
  slug: "vaginal-atrophy-atrophic-vaginitis";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vulvar-itching-irritation-perimenopause.md": {
	id: "vulvar-itching-irritation-perimenopause.md";
  slug: "vulvar-itching-irritation-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-age-does-a-woman-stop-getting-wet.md": {
	id: "what-age-does-a-woman-stop-getting-wet.md";
  slug: "what-age-does-a-woman-stop-getting-wet";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-causes-hair-loss-in-perimenopause.md": {
	id: "what-causes-hair-loss-in-perimenopause.md";
  slug: "what-causes-hair-loss-in-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-does-progesterone-do-perimenopause.md": {
	id: "what-does-progesterone-do-perimenopause.md";
  slug: "what-does-progesterone-do-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-does-vaginal-dryness-feel-like.md": {
	id: "what-does-vaginal-dryness-feel-like.md";
  slug: "what-does-vaginal-dryness-feel-like";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-happens-to-fibroids-during-perimenopause.md": {
	id: "what-happens-to-fibroids-during-perimenopause.md";
  slug: "what-happens-to-fibroids-during-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-is-oestrogen-perimenopause.md": {
	id: "what-is-oestrogen-perimenopause.md";
  slug: "what-is-oestrogen-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"what-is-perimenopause.md": {
	id: "what-is-perimenopause.md";
  slug: "what-is-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"when-to-see-doctor-perimenopause.md": {
	id: "when-to-see-doctor-perimenopause.md";
  slug: "when-to-see-doctor-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-am-i-suddenly-dry-down-there.md": {
	id: "why-am-i-suddenly-dry-down-there.md";
  slug: "why-am-i-suddenly-dry-down-there";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"why-urinate-more-perimenopause.md": {
	id: "why-urinate-more-perimenopause.md";
  slug: "why-urinate-more-perimenopause";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"community": {
"anxiety-affecting-work.md": {
	id: "anxiety-affecting-work.md";
  slug: "anxiety-affecting-work";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"belly-fat-no-diet-change.md": {
	id: "belly-fat-no-diet-change.md";
  slug: "belly-fat-no-diet-change";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"cold-after-hot-flash.md": {
	id: "cold-after-hot-flash.md";
  slug: "cold-after-hot-flash";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"crying-for-no-reason.md": {
	id: "crying-for-no-reason.md";
  slug: "crying-for-no-reason";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"doctor-refused-hrt.md": {
	id: "doctor-refused-hrt.md";
  slug: "doctor-refused-hrt";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"exhausted-but-cant-sleep.md": {
	id: "exhausted-but-cant-sleep.md";
  slug: "exhausted-but-cant-sleep";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"forgot-presentation.md": {
	id: "forgot-presentation.md";
  slug: "forgot-presentation";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"hair-loss-perimenopause.md": {
	id: "hair-loss-perimenopause.md";
  slug: "hair-loss-perimenopause";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"hot-flashes-at-work.md": {
	id: "hot-flashes-at-work.md";
  slug: "hot-flashes-at-work";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"hot-flashes-waking-at-night.md": {
	id: "hot-flashes-waking-at-night.md";
  slug: "hot-flashes-waking-at-night";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"how-do-i-know-if-perimenopause.md": {
	id: "how-do-i-know-if-perimenopause.md";
  slug: "how-do-i-know-if-perimenopause";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"how-much-protein-do-i-need.md": {
	id: "how-much-protein-do-i-need.md";
  slug: "how-much-protein-do-i-need";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"hrt-breast-cancer-family-history.md": {
	id: "hrt-breast-cancer-family-history.md";
  slug: "hrt-breast-cancer-family-history";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"hrt-patch-vs-tablet.md": {
	id: "hrt-patch-vs-tablet.md";
  slug: "hrt-patch-vs-tablet";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"i-snore-now-perimenopause.md": {
	id: "i-snore-now-perimenopause.md";
  slug: "i-snore-now-perimenopause";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"intermittent-fasting-perimenopause.md": {
	id: "intermittent-fasting-perimenopause.md";
  slug: "intermittent-fasting-perimenopause";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"irregular-periods-normal.md": {
	id: "irregular-periods-normal.md";
  slug: "irregular-periods-normal";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"jawline-acne-at-44.md": {
	id: "jawline-acne-at-44.md";
  slug: "jawline-acne-at-44";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"losing-words-mid-sentence.md": {
	id: "losing-words-mid-sentence.md";
  slug: "losing-words-mid-sentence";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"no-desire-for-intimacy.md": {
	id: "no-desire-for-intimacy.md";
  slug: "no-desire-for-intimacy";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"pain-during-sex.md": {
	id: "pain-during-sex.md";
  slug: "pain-during-sex";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"panic-attacks-perimenopause.md": {
	id: "panic-attacks-perimenopause.md";
  slug: "panic-attacks-perimenopause";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"perimenopause-or-something-else.md": {
	id: "perimenopause-or-something-else.md";
  slug: "perimenopause-or-something-else";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"period-after-8-months-gap.md": {
	id: "period-after-8-months-gap.md";
  slug: "period-after-8-months-gap";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"periods-too-heavy.md": {
	id: "periods-too-heavy.md";
  slug: "periods-too-heavy";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"sleep-tablets-not-working.md": {
	id: "sleep-tablets-not-working.md";
  slug: "sleep-tablets-not-working";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"snapping-at-family.md": {
	id: "snapping-at-family.md";
  slug: "snapping-at-family";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"too-hot-to-sleep.md": {
	id: "too-hot-to-sleep.md";
  slug: "too-hot-to-sleep";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"weight-going-up-eating-less.md": {
	id: "weight-going-up-eating-less.md";
  slug: "weight-going-up-eating-less";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
"why-do-i-wake-at-3am.md": {
	id: "why-do-i-wake-at-3am.md";
  slug: "why-do-i-wake-at-3am";
  body: string;
  collection: "community";
  data: InferEntrySchema<"community">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
