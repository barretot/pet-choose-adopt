import {
  IsInt,
  IsString,
  Min,
  Max,
  IsOptional,
  Matches,
  IsNotEmpty,
  IsIn,
} from 'class-validator'

export class Env {
  @IsString()
  @IsOptional()
  readonly NODE_ENV!: string

  @IsInt()
  @Min(2)
  @Max(2)
  @IsIn([0, 1, 2])
  @IsNotEmpty()
  readonly ARGON2_TYPE!: 0 | 1 | 2

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
