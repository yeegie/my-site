from pydantic import BaseModel
from typing import Optional, List


class ImageSchema(BaseModel):
    id: int
    file_name: str
    full_path: str
