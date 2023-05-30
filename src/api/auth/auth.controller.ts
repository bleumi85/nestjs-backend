import { Body, Controller, Headers, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CookieOptions, Request, Response } from 'express';
import { AuthService } from './auth.service';
import { ForgotPasswordDto, LoginDto } from './dto';

const name = 'auth';

@Controller(name)
@ApiTags(name)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto, @Req() req: Request, @Res() res: Response) {
        const ipAddress: string = req.ip;
        const { refreshToken, ...result } = await this.authService.login(loginDto, ipAddress);
        this.setTokenCookie(res, refreshToken);
        return res.json(result);
    }

    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto, @Headers('origin') origin: string) {
        await this.authService.forgotPassword(forgotPasswordDto, origin);
        return {
            message: 'Please check your email for password reset instructions'
        }
    }

    // helper function

    private setTokenCookie(res: Response, token: string) {
        const cookieOptions: CookieOptions = {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        };
        res.cookie('jbl_dev_token', token, cookieOptions);
    }
}
