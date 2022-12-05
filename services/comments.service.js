"use strict";

const DbMixin = require("../mixins/db.mixin");

module.exports = {
	name: "comments",

	mixins: [DbMixin("comments")],

	settings: {
		fields: [
			"_id",
			"product_id",
			"text"
		],

		entityValidator: {
			product_id: "string|min:3",
			text: "string|min:3",
		}
	},

	hooks: {
		before: {}
	},

	actions: {
		/**
		 * The "moleculer-db" mixin registers the following actions:
		 */
		get: false,
		list: true,
		find: false,
		count: false,
		create: false,
		insert: false,
		update: false,
		remove: false,

		// --- ADDITIONAL ACTIONS ---

		/**
		 * Get Random Prompt
		 */
		random_review: {
			params: {},
			async handler() {
				return await this.adapter.collection.aggregate([{$sample: {size: 1}}]).next();
			}
		},
		/**
		 * Insert New Prompt
		 */
		new: {
			auth: true,
			rest: "POST /new",
			params: {
				product_id: "string",
				text: "string"
			},
			async handler(ctx) {
				return await this.adapter.insert({
					text: ctx.params.text,
					product_id: ctx.params.product_id,
					createdAt: Date.now()
				});
			}
		},
	},

	methods: {
		async seedDB() {
			await this.adapter.insertMany([
				{product_id: "123", text: "test prompt 1", date: Date.now()},
				{product_id: "456", text: "test prompt 2", date: Date.now()},
			]);
		}
	},

	async afterConnected() {

	}
};
