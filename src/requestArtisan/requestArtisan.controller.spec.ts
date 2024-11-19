import { Test, TestingModule } from "@nestjs/testing";
import { RequestController } from "./requestArtisan.controller";
import { RequestService } from "./requestArtisan.service";

describe("RequestController", () => {
  let controller: RequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequestController],
      providers: [RequestService],
    }).compile();

    controller = module.get<RequestController>(RequestController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
