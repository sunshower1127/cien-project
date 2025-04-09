package main

import (
	"flag"
	"fmt"
	"log"

	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
	"github.com/gofiber/fiber/v2/middleware/logger"
)

func main() {
	// 커맨드라인 플래그를 이용한 포트 설정
	port := flag.Int("port", 3000, "포트 번호 설정")
	flag.Parse()

	app := fiber.New(fiber.Config{
		AppName: "Cien Project Static Server",
	})

	// 로깅 미들웨어 추가
	app.Use(logger.New())

	app.Use(cors.New())

	// 정적 파일 서빙 설정
	app.Use("/", filesystem.New(filesystem.Config{
		Root:   http.Dir("./dist"),
		Browse: false,
		Index:  "index.html",
	}))

	// SPA 라우팅을 위한 설정 (모든 경로를 index.html로 리디렉션)
	app.Use(func(c *fiber.Ctx) error {
		if err := c.SendFile("./dist/index.html"); err != nil {
			return c.Status(fiber.StatusInternalServerError).SendString("Error loading index file")
		}
		return nil
	})

	// 서버 시작
	addr := fmt.Sprintf(":%d", *port)
	log.Printf("서버 시작: http://localhost%s", addr)
	if err := app.Listen(addr); err != nil {
		log.Fatalf("서버 시작 실패: %v", err)
	}
}
