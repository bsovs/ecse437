"use strict";

const DbMixin = require("../mixins/db.mixin");

/**
 * @typedef {import("moleculer").ServiceSchema} ServiceSchema Moleculer's Service Schema
 * @typedef {import("moleculer").Context} Context Moleculer's Context
 */

/** @type {ServiceSchema} */
module.exports = {
	name: "customer",
	// version: 1

	/**
	 * Mixins
	 */
	mixins: [DbMixin("customer")],

	/**
	 * Settings
	 */
	settings: {
		// Available fields in the responses
		fields: [
			"_id",
			"name",
			"email",
			"products"
		],

		// Validator for the `create` & `insert` actions.
		entityValidator: {
			name: "string|min:3",
			email: "email",
			products: "array"
		}
	},

	/**
	 * Action Hooks
	 */
	hooks: {
		before: {
			/**
			 * Register a before hook for the `create` action.
			 * It sets a default value for the quantity field.
			 *
			 * @param {Context} ctx
			 */
			create(ctx) {
				return ctx;
			}
		}
	},

	/**
	 * Actions
	 */
	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 *  - list
		 *  - find
		 *  - count
		 *  - create
		 *  - insert
		 *  - update
		 *  - remove
		 */

		// --- ADDITIONAL ACTIONS ---

		/**
		 * Add a product to user.
		 */
		addProduct: {
			rest: "POST /:id/product",
			params: {
				id: "string",
				product: "string"
			},
			/** @param {Context} ctx */
			async handler(ctx) {
				const doc = await this.adapter.updateById(ctx.params.id, {$push: {products: ctx.params.product}});
				const json = await this.transformDocuments(ctx, ctx.params, doc);
				await this.entityChanged("updated", json, ctx);

				return json;
			}
		},
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Loading sample data to the collection.
		 * It is called in the DB.mixin after the database
		 * connection establishing & the collection is empty.
		 */
		async seedDB() {
			await this.adapter.insertMany([
				{name: "Brandon Sovran", email: "brandon.sovran@mail.mcgill.ca", products: []},
				{name: "Hong Yi Meng", email: "hong.meng@mail.mcgill.ca", products: []},
			]);
		}
	},

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {
		// await this.adapter.collection.createIndex({ name: 1 });
	}
};
