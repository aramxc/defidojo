from pydantic import BaseModel, Field, validator
from typing import List, Optional, Dict, Any
from datetime import datetime


class TagSchema(BaseModel):
    """Schema for challenge tags"""
    id: Optional[str] = None
    name: str = Field(..., min_length=1, max_length=50)
    color: str = Field(..., pattern=r'^rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)$')
    background_color: str

    class Config:
        from_attributes = True


class TestCaseSchema(BaseModel):
    """Schema for challenge test cases"""
    id: Optional[str] = None
    challenge_id: Optional[str] = None
    input: str
    expected_output: str
    is_public: bool = True
    order: int = Field(..., ge=0)

    class Config:
        from_attributes = True


class ChallengeExample(BaseModel):
    """Schema for challenge examples"""
    input: str
    output: str
    explanation: Optional[str] = None


class ChallengeCreate(BaseModel):
    """Schema for creating a new challenge"""
    title: str = Field(..., min_length=3, max_length=255)
    difficulty: str = Field(..., pattern='^(Easy|Medium|Hard)$')
    description: str = Field(..., min_length=10)
    examples: List[ChallengeExample]
    constraints: List[str]
    initial_code: Optional[str] = None
    tags: List[str]  # List of tag names
    is_template: bool = False
    is_draft: bool = False
    parent_template_id: Optional[str] = None

    @validator('constraints')
    def validate_constraints(cls, v):
        if not v:
            raise ValueError('At least one constraint is required')
        return v


class ChallengeUpdate(BaseModel):
    """Schema for updating an existing challenge"""
    title: Optional[str] = Field(None, min_length=3, max_length=255)
    difficulty: Optional[str] = Field(None, pattern='^(Easy|Medium|Hard)$')
    description: Optional[str] = Field(None, min_length=10)
    examples: Optional[List[ChallengeExample]] = None
    constraints: Optional[List[str]] = None
    initial_code: Optional[str] = None
    tags: Optional[List[str]] = None
    is_template: Optional[bool] = None
    is_draft: Optional[bool] = None


class SolutionCreate(BaseModel):
    """Schema for submitting a solution"""
    challenge_id: str
    code: str = Field(..., min_length=1)
    language: str = Field(..., pattern='^(solidity|javascript|python)$')


class SolutionResponse(BaseModel):
    """Schema for solution response"""
    id: str
    challenge_id: str
    user_id: str
    code: str
    language: str
    passed_tests: bool
    execution_time: Optional[int]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ChallengeResponse(BaseModel):
    """Schema for challenge response"""
    id: str
    title: str
    difficulty: str
    description: str
    examples: List[Dict[str, Any]]
    constraints: List[str]
    author_id: str
    author_name: str
    initial_code: Optional[str]
    tags: List[TagSchema]
    upvotes: int
    downvotes: int
    total_votes: int
    is_template: bool
    is_draft: bool
    parent_template_id: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True