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
		
	};

	type DataEntryMap = {
		"banners": {
"hero": {
	id: "hero";
  collection: "banners";
  data: any
};
};
"categories": {
"categories": {
	id: "categories";
  collection: "categories";
  data: any
};
};
"collections": {
"collections": {
	id: "collections";
  collection: "collections";
  data: any
};
};
"looks": {
"looks": {
	id: "looks";
  collection: "looks";
  data: any
};
};
"products": {
"antratsitovi-dzhinsi-iz-visokoyu-talieyu/product": {
	id: "antratsitovi-dzhinsi-iz-visokoyu-talieyu/product";
  collection: "products";
  data: any
};
"antratsitovi-dzhinsi-shavi/product": {
	id: "antratsitovi-dzhinsi-shavi/product";
  collection: "products";
  data: any
};
"bezheva-futbolka/product": {
	id: "bezheva-futbolka/product";
  collection: "products";
  data: any
};
"bili-dzhinsi-iz-visokoyu-talieyu/product": {
	id: "bili-dzhinsi-iz-visokoyu-talieyu/product";
  collection: "products";
  data: any
};
"bordova-prozora-bluzka/product": {
	id: "bordova-prozora-bluzka/product";
  collection: "products";
  data: any
};
"chorna-futbolka-dyubi/product": {
	id: "chorna-futbolka-dyubi/product";
  collection: "products";
  data: any
};
"chorna-futbolka/product": {
	id: "chorna-futbolka/product";
  collection: "products";
  data: any
};
"chorniy-bazoviy-krop-top/product": {
	id: "chorniy-bazoviy-krop-top/product";
  collection: "products";
  data: any
};
"korichneva-prozora-bluzka/product": {
	id: "korichneva-prozora-bluzka/product";
  collection: "products";
  data: any
};
"korichnevi-dzhinsi/product": {
	id: "korichnevi-dzhinsi/product";
  collection: "products";
  data: any
};
"krizhani-dzhinsi-detali-visoka-posadka/product": {
	id: "krizhani-dzhinsi-detali-visoka-posadka/product";
  collection: "products";
  data: any
};
"krizhano-blakitni-dzhinsi-z-visokoyu-talieyu/product": {
	id: "krizhano-blakitni-dzhinsi-z-visokoyu-talieyu/product";
  collection: "products";
  data: any
};
"sini-dzhinsi-iz-visokoyu-talieyu-poterti/product": {
	id: "sini-dzhinsi-iz-visokoyu-talieyu-poterti/product";
  collection: "products";
  data: any
};
"sini-dzhinsi-iz-visokoyu-talieyu-ta-gudzikami/product": {
	id: "sini-dzhinsi-iz-visokoyu-talieyu-ta-gudzikami/product";
  collection: "products";
  data: any
};
"sini-dzhinsi-iz-visokoyu-talieyu/product": {
	id: "sini-dzhinsi-iz-visokoyu-talieyu/product";
  collection: "products";
  data: any
};
"sini-dzhinsi-z-visokoyu-talieyu/product": {
	id: "sini-dzhinsi-z-visokoyu-talieyu/product";
  collection: "products";
  data: any
};
"siriy-krop-top-na-bretelkakh/product": {
	id: "siriy-krop-top-na-bretelkakh/product";
  collection: "products";
  data: any
};
"svitlo-blakitni-dzhinsi-shavi/product": {
	id: "svitlo-blakitni-dzhinsi-shavi/product";
  collection: "products";
  data: any
};
"temno-korichneviy-krop-top/product": {
	id: "temno-korichneviy-krop-top/product";
  collection: "products";
  data: any
};
"zhovta-futbolka-dyubi/product": {
	id: "zhovta-futbolka-dyubi/product";
  collection: "products";
  data: any
};
"zhovtiy-krop-top/product": {
	id: "zhovtiy-krop-top/product";
  collection: "products";
  data: any
};
};
"promoline": {
"promos": {
	id: "promos";
  collection: "promoline";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
