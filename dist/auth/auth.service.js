"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("../entities/users.entity");
let AuthService = class AuthService {
    constructor(jwt, config, userRepo) {
        this.jwt = jwt;
        this.config = config;
        this.userRepo = userRepo;
    }
    async signup(dto) {
        try {
            if (dto.password !== dto.confirmPassword) {
                throw new common_1.BadRequestException('Passwords do not match!');
            }
            dto.password = await argon.hash(dto.password);
            const user = this.userRepo.create(dto);
            await user.save();
            return this.signToken(user.id, user.email);
        }
        catch (e) {
            throw e;
        }
    }
    async signin({ email, password }) {
        try {
            const user = await this.userRepo.findOne({ where: { email } });
            if (!user)
                throw new common_1.NotFoundException('Credentials incorrect');
            const validPassword = await argon.verify(user.password, password);
            if (!validPassword)
                throw new common_1.NotFoundException('Credentials incorrect');
            return this.signToken(user.id, user.email);
        }
        catch (e) {
            throw e;
        }
    }
    async validateGoogleUser(profile) {
        const { id, emails, name, photos } = profile;
        const email = emails[0].value;
        let user = await this.userRepo.findOne({ where: { googleId: id } });
        if (!user) {
            user = await this.userRepo.findOne({ where: { email } });
            if (!user) {
                user = this.userRepo.create({
                    email,
                    googleId: id,
                    firstName: name.givenName,
                    lastName: name.familyName,
                    image: photos[0].value,
                });
                await this.userRepo.save(user);
            }
            else {
                user.googleId = id;
                await this.userRepo.save(user);
            }
        }
        return user;
    }
    async signToken(userId, email) {
        const payload = {
            sub: userId,
            email,
        };
        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: '10m',
            secret: this.config.get('JWT_SECRET'),
        });
        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: '1d',
            secret: this.config.get('JWT_REFRESH_SECRET'),
        });
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async refreshToken(token) {
        try {
            const payload = await this.jwt.verifyAsync(token, {
                secret: this.config.get('JWT_REFRESH_SECRET'),
            });
            const user = await this.userRepo.findOne({ where: { id: payload.sub } });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            return this.signToken(user.id, user.email);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(users_entity_1.UserEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.Repository])
], AuthService);
//# sourceMappingURL=auth.service.js.map