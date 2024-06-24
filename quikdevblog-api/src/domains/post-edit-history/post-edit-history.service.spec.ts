import { Test, TestingModule } from '@nestjs/testing';
import { PostEditHistoryService } from './post-edit-history.service';

describe('PostEditHistoryService', () => {
  let service: PostEditHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostEditHistoryService],
    }).compile();

    service = module.get<PostEditHistoryService>(PostEditHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
