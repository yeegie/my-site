from .auth import router as auth_router
from .work import router as work_router
from .image import router as image_router
from .stack import router as stack_router
from .user import router as user_router


__all__ = [
    'auth_router',
    'work_router',
    'image_router',
    'stack_router',
    'user_router',
]
