import { Body, Controller, Get, Post, Req, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from 'src/dto/sign-up.dto';
import { SignInDto } from 'src/dto/sign-in.dto';
import { VerifyOtpDto } from 'src/dto/verify-otp.dto';
import { ResendOtpDto } from 'src/dto/resend-otp.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Auth')
@ApiBearerAuth('access-token')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign_up')
  @ApiOperation({
    summary: 'Enables new user to create account so as to access the application',
  })
  async signUp(
    @Body() dto: SignUpDto,
    @Body('user_img') base64_file?: string,
  ) {
    try {
      return await this.authService.sign_up(dto, base64_file || '');
    } catch (error) {
      throw new HttpException(error.message || 'Failed to sign up', error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Post('verify_otp')
  @ApiOperation({
    summary: 'Enable users to verify their email after sign up',
  })
  async verifyOtp(@Body() dto: VerifyOtpDto) {
    try {
      return await this.authService.verifyOtp(dto.email, dto.otp);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to verify OTP', error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Post('resend_otp')
  @ApiOperation({
    summary: 'Enable users to resend OTP for email verification',
  })
  async resendOtp(@Body() dto: ResendOtpDto) {
    try {
      return await this.authService.resendOtp(dto.email);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to resend OTP', error.status || HttpStatus.BAD_REQUEST);
    }
  }

  @Post('sign_in')
  @ApiOperation({
    summary: 'Enable users to sign in to the application',
  })
  async signIn(@Body() dto: SignInDto) {
    try {
      return await this.authService.sign_in(dto);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to sign in', error.status || HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(AuthGuard)
  @Get('signed_in_user')
  @ApiOperation({
    summary: 'This API returns the signed-in user',
  })
  async getLoggedInUser(@Req() req) {
    try {
      return await this.authService.getUserById(req.user._id);
    } catch (error) {
      throw new HttpException(error.message || 'Failed to fetch signed-in user', error.status || HttpStatus.BAD_REQUEST);
    }
  }
}