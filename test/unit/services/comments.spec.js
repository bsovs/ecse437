"use strict";

const {ServiceBroker} = require("moleculer");
const TestService = require("../../../services/comments.service");

describe("Test 'comments' service", () => {

	describe("Test actions", () => {
		const broker = new ServiceBroker({logger: false});
		const service = broker.createService(TestService);

		jest.spyOn(service.adapter, "insert");
		jest.spyOn(service, "transformDocuments");
		jest.spyOn(service, "entityChanged");

		beforeAll(() => broker.start());
		afterAll(() => broker.stop());

		const record = {
			_id: "123",
			product_id: "123",
			text: "a review",
			createdAt: Date.now()
		};

		describe("Test 'comments.new'", () => {

			it("should call the adapter insert method & transform result", async () => {
				service.adapter.insert.mockImplementation(async () => record);
				service.transformDocuments.mockClear();
				service.entityChanged.mockClear();

				const res = await broker.call("comments.new", {
					product_id: "123",
					text: "a review"
				});
				expect(res).toEqual({
					_id: expect.any(String),
					product_id: "123",
					text: "a review",
					createdAt: expect.any(Number)
				});

				expect(service.adapter.insert).toBeCalledTimes(1);
				expect(service.adapter.insert).toBeCalledWith({
					product_id: "123",
					text: "a review",
					createdAt: expect.any(Number)
				});

				expect(service.entityChanged).toBeCalledTimes(0);
			});

		});

	});
});

