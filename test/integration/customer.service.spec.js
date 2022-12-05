"use strict";

const {ServiceBroker, Context} = require("moleculer");
const {ValidationError} = require("moleculer").Errors;
const TestService = require("../../services/customer.service");

describe("Test 'customer' service", () => {

	describe("Test actions", () => {
		const broker = new ServiceBroker({logger: false});
		const service = broker.createService(TestService);
		service.seedDB = null; // Disable seeding

		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		const record = {
			name: "Awesome customer",
			email: "awesome@email.com",
			products: []
		};
		let newID;

		it("should contains the seeded items", async () => {
			const res = await broker.call("customer.list");
			expect(res).toEqual({page: 1, pageSize: 10, rows: [], total: 0, totalPages: 0});
		});

		it("should add the new customer", async () => {
			const res = await broker.call("customer.create", record);
			expect(res).toEqual({
				_id: expect.any(String),
				name: "Awesome customer",
				email: "awesome@email.com",
				products: []
			});
			newID = res._id;

			const res2 = await broker.call("customer.count");
			expect(res2).toBe(1);
		});

		it("should get the saved item", async () => {
			const res = await broker.call("customer.get", {id: newID});
			expect(res).toEqual({
				_id: expect.any(String),
				name: "Awesome customer",
				email: "awesome@email.com",
				products: []
			});

			const res2 = await broker.call("customer.list");
			expect(res2).toEqual({
				page: 1,
				pageSize: 10,
				rows: [{
					_id: newID,
					name: "Awesome customer",
					email: "awesome@email.com",
					products: []
				}],
				total: 1,
				totalPages: 1
			});
		});

		it("should update an item", async () => {
			const res = await broker.call("customer.update", {id: newID, email: "awesome2@email.com"});
			expect(res).toEqual({
				_id: expect.any(String),
				name: "Awesome customer",
				email: "awesome2@email.com",
				products: []
			});
		});

		it("should get the updated item", async () => {
			const res = await broker.call("customer.get", {id: newID});
			expect(res).toEqual({
				_id: expect.any(String),
				name: "Awesome customer",
				email: "awesome2@email.com",
				products: []
			});
		});

		it("should increase the quantity", async () => {
			const res = await broker.call("customer.addProduct", {id: newID, product: "a"});
			expect(res).toEqual({
				_id: expect.any(String),
				name: "Awesome customer",
				email: "awesome2@email.com",
				products: ["a"]
			});
		});

		it("should remove the updated item", async () => {
			const res = await broker.call("customer.remove", {id: newID});
			expect(res).toBe(1);

			const res2 = await broker.call("customer.count");
			expect(res2).toBe(0);

			const res3 = await broker.call("customer.list");
			expect(res3).toEqual({page: 1, pageSize: 10, rows: [], total: 0, totalPages: 0});
		});

	});

});

