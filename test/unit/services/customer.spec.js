"use strict";

const {ServiceBroker, Context} = require("moleculer");
const TestService = require("../../../services/customer.service");

describe("Test 'customer' service", () => {

	describe("Test actions", () => {
		const broker = new ServiceBroker({logger: false});
		const service = broker.createService(TestService);

		jest.spyOn(service.adapter, "updateById");
		jest.spyOn(service, "transformDocuments");
		jest.spyOn(service, "entityChanged");

		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		const record = {
			_id: "123",
			name: "Awesome user",
			email: "awesome@email.com",
			products: [],
			createdAt: Date.now()
		};

		describe("Test 'customer.addProduct'", () => {

			it("should call the adapter updateById method & transform result", async () => {
				service.adapter.updateById.mockImplementation(async () => record);
				service.transformDocuments.mockClear();
				service.entityChanged.mockClear();

				const res = await broker.call("customer.addProduct", {
					id: "123",
					product: "a"
				});
				expect(res).toEqual({
					_id: "123",
					name: "Awesome user",
					email: "awesome@email.com",
					products: [],
				});

				expect(service.adapter.updateById).toBeCalledTimes(1);
				expect(service.adapter.updateById).toBeCalledWith("123", {$push: {products: "a"}});

				expect(service.transformDocuments).toBeCalledTimes(1);
				expect(service.transformDocuments).toBeCalledWith(expect.any(Context), {
					id: "123",
					product: "a"
				}, record);

				expect(service.entityChanged).toBeCalledTimes(1);
				expect(service.entityChanged).toBeCalledWith("updated", {
					_id: "123",
					name: "Awesome user",
					email: "awesome@email.com",
					products: [],
				}, expect.any(Context));
			});

		});

	});
});

