from pydantic import BaseModel, Field, EmailStr, validator
from typing import Optional
from datetime import datetime
from uuid import UUID


class UserCreate(BaseModel):
    """Schema for user registration"""
    username: str = Field(..., min_length=3, max_length=50, pattern=r'^[a-zA-Z0-9_-]+$')
    email: EmailStr
    wallet_address: Optional[str] = Field(None, pattern=r'^0x[a-fA-F0-9]{40}$')

    @validator('username')
    def username_alphanumeric(cls, v):
        if not v.isalnum() and not all(c in '_-' for c in v if not c.isalnum()):
            raise ValueError('Username must be alphanumeric with only _ and - allowed')
        return v


class UserUpdate(BaseModel):
    """Schema for updating user profile"""
    username: Optional[str] = Field(None, min_length=3, max_length=50)
    email: Optional[EmailStr] = None
    wallet_address: Optional[str] = Field(None, pattern=r'^0x[a-fA-F0-9]{40}$')


class UserResponse(BaseModel):
    """Schema for user response"""
    id: UUID
    username: str
    email: str
    wallet_address: Optional[str]
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }