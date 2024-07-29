import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2';
describe('AuthService', () => {
  let service: AuthService;
  let userRepo: Repository<UserEntity>;
  let jwtService: JwtService;
  let configService: ConfigService;
  const mockUserRepo = {
    create: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
  };
  // Mock JwtService
  const mockJwtService = {
    signAsync: jest.fn().mockReturnValue('mocked_token'),
    verify: jest.fn().mockReturnValue({ userId: '123' }),
    decode: jest.fn().mockReturnValue({ userId: '123' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUserRepo,
        },
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: ConfigService, // Ensure this matches the actual token for your ConfigService
          useValue: {
            get: jest.fn(() => 'mock_secret'),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userRepo = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signin', () => {
    it('should throw NotFoundException if user is not found', async () => {
      // Arrange
      const dto: SigninDto = { email: 'test@test.com', password: '1234' };
      mockUserRepo.findOne.mockResolvedValue(null);

      // Act & Assert
      await expect(service.signin(dto)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if password is incorrect', async () => {
      // Arrange
      const dto: SigninDto = { email: 'test@test.com', password: '1234' };
      const user = { email: 'test@test.com', password: 'wrong_password' };
      mockUserRepo.findOne.mockResolvedValue(user);
      jest.spyOn(argon, 'verify').mockResolvedValue(false);

      // Act & Assert
      await expect(service.signin(dto)).rejects.toThrow(NotFoundException);
    });

    it('should return a token if signin is successful', async () => {
      // Arrange
      const dto: SigninDto = { email: 'test@test.com', password: '1234' };
      const user = {
        id: '1',
        email: 'test@test.com',
        password: 'hashed_password',
      };
      mockUserRepo.findOne.mockResolvedValue(user);
      jest.spyOn(argon, 'verify').mockResolvedValue(true);

      // Act
      const result = await service.signin(dto);

      // Assert
      expect(result).toEqual({ access_token: 'mocked_token' });
    });
  });

  describe('signup', () => {
    it('should throw BadRequestException if passwords do not match', async () => {
      // Arrange
      const dto: SignupDto = {
        email: 'test@tes.com',
        password: '1234',
        confirmPassword: '12345',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
      };
      // Act & Assert
      await expect(service.signup(dto)).rejects.toThrow(BadRequestException);
    });

    it('should throw ConflictException if credentials already exist', async () => {
      // Arrange
      const dto: SignupDto = {
        email: 'test@tes.com',
        password: '1234',
        confirmPassword: '12345',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
      };
      mockUserRepo.create.mockReturnValue(dto);
      mockUserRepo.save.mockRejectedValue({ code: '23505' });

      // Act & Assert
      await expect(service.signup(dto)).rejects.toThrow(BadRequestException);
    });

    it('should return a token if signup is successful', async () => {
      // Arrange
      const dto: SignupDto = {
        email: 'test@tes.com',
        password: '1234',
        confirmPassword: '1234',
        firstName: 'Test',
        lastName: 'User',
        phone: '1234567890',
      };
      const user = { id: '1', email: 'test@test.com' };
      mockUserRepo.create.mockReturnValue(user);
      mockUserRepo.save.mockResolvedValue(user);

      // Act
      const result = await service.signup(dto);

      // Assert
      expect(result).toEqual({ access_token: 'mocked_token' });
    });
  });

  describe('signToken', () => {
    it('should return an access token', async () => {
      // Arrange
      const id = '1';
      const email = 'test@test.com';

      // Act
      const result = await service.signToken(id, email);

      // Assert
      expect(result).toEqual({ access_token: 'mocked_token' });
      expect(mockJwtService.signAsync).toHaveBeenCalledWith(
        { sub: id, email },
        { expiresIn: '10m', secret: 'mock_secret' },
      );
    });
  });
});
