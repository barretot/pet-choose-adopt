import {
  IsInt,
  IsString,
  Min,
  Max,
  IsOptional,
  Matches,
  IsNotEmpty,
} from 'class-validator'

export class Env {
  @IsString()
  @IsOptional()
  readonly NODE_ENV!: string

  @IsInt()
  @Min(2)
  @Max(2)
  @IsNotEmpty()
  readonly ARGON2_TYPE!: number

  @IsInt()
  @Min(1)
  @IsNotEmpty()
  readonly ARGON2_TIME_COST!: number

  @IsInt()
  readonly PORT: number = 3333

  @IsNotEmpty()
  @IsString()
  @Matches(/^postgresql:\/\/\S+$/) // Valida strings no formato de conexão PostgreSQL
  readonly DATABASE_URL!: string

  @IsNotEmpty()
  @IsString()
  readonly JWT_PRIVATE_KEY!: string

  @IsNotEmpty()
  @IsString()
  readonly JWT_PUBLIC_KEY!: string
}
