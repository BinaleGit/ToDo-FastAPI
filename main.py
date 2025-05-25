from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from models import Task, Base, User
from passlib.context import CryptContext  # type: ignore

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI()

class TaskCreate(BaseModel):
    title: str
    description: str = None
    completed: bool = False

class UserCreate(BaseModel):
    email: str
    password: str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"], 
)

@app.api_route("/tasks/", methods=["GET", "POST"])
def tasks_route(task: TaskCreate = None, db: Session = Depends(get_db)):
    if task: 
        print(task.title)
        print(task.description)
        db_task = Task(title=task.title, description=task.description, completed=False)
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task
    else: 
        tasks = db.query(Task).all()
        print(tasks)
        return tasks
    
@app.post("/users/")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
        existing_user = db.query(User).filter(User.email == user.email).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already Exist")
    
        hashed_password = pwd_context.hash(user.password)
        new_user = User(email=user.email, hashed_password=hashed_password)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

