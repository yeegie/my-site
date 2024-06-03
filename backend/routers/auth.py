from fastapi import APIRouter, HTTPException, Depends, Response
from fastapi.security import OAuth2PasswordBearer
from fastapi_limiter.depends import RateLimiter

from tortoise.exceptions import DoesNotExist, IntegrityError

from typing import Annotated

from schemas.dto.auth import AuthDto
from schemas.dto.user import UserCreateDto

from services.auth import AuthService

from jose import JWTError

from loguru import logger


router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/auth/login')


@router.post('/register', dependencies=[Depends(RateLimiter(times=5, seconds=10))])
async def register(dto: UserCreateDto):
    try:
        new_user = await AuthService.register(dto)
        logger.info(f'New {new_user.type} {new_user.email}')
        return new_user
    except IntegrityError as ex:
        raise HTTPException(409, detail=str(ex))
    except Exception as ex:
        raise HTTPException(500, detail=str(ex))


@router.post('/login', dependencies=[Depends(RateLimiter(times=5, seconds=10))])
async def login(dto: Annotated[AuthDto, Depends()]):  # form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
    try:
        return await AuthService.login(dto.username, dto.password)
    except DoesNotExist as ex:
        raise HTTPException(404, detail=str(ex))
    except ValueError as ex:
        raise HTTPException(404, detail=str(ex))
    except Exception as ex:
        raise HTTPException(500, detail=str(ex))
    

@router.post('/refresh', dependencies=[Depends(RateLimiter(times=5, seconds=10))])
async def refresh(refresh_token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        return await AuthService.refresh(refresh_token)
    except JWTError as ex:
        raise HTTPException(401, detail=str(ex))
    except DoesNotExist as ex:
        raise HTTPException(404, detail=str(ex))
    except Exception as ex:
        raise HTTPException(500, detail=str(ex))
    

@router.post('/validate', dependencies=[Depends(RateLimiter(times=5, seconds=10))])
async def check(access_token: Annotated[str, Depends(oauth2_scheme)]):
    try:
        await AuthService.check(access_token)
        return Response(status_code=200, content='ok')
    except JWTError as ex:
        raise HTTPException(401, detail=str(ex))
    except DoesNotExist as ex:
        raise HTTPException(404, detail=str(ex))
    except Exception as ex:
        raise HTTPException(500, detail=str(ex))
    

# @router.post('/decode')
# async def decode(token: str):
#     try:
#         return await AuthService.decode(token)
#     except Exception as ex:
#         raise HTTPException(500, detail=str(ex))
    

# @router.get("/test")
# async def read_items(access_token: Annotated[str, Depends(oauth2_scheme)], refresh_token: Annotated[str, Depends(oauth2_scheme)]):
#     return {"access_token": access_token, 'refresh_token': refresh_token}
