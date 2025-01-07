import uvicorn

from src.starter import app


def start_web_app():
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8089,
        log_level="info",
    )


def start():
    start_web_app()


if __name__ == "__main__":
    start()
