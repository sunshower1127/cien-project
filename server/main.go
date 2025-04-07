package main

import (
	"embed"
	"io/fs"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/filesystem"
)

//go:embed all:dist
var distDir embed.FS

func getDistFS() http.FileSystem {
	stripped, err := fs.Sub(distDir, "dist")
	if err != nil {
		panic(err)
	}
	return http.FS(stripped)
}

func main() {
	app := fiber.New(fiber.Config{
		// HTML 압축 활성화
		CompressedFileSuffix: ".fiber.gz",
	})

	app.All("/*", filesystem.New(filesystem.Config{
		Root:         getDistFS(),
		NotFoundFile: "index.html",
		Index:        "index.html",
	}))

	// 환경 변수에서 포트를 가져오거나 기본값 사용
	port := os.Getenv("PORT")
	if port == "" {
		port = "80"
	}

	log.Printf("서버가 http://localhost:%s 에서 실행 중입니다", port)
	log.Fatal(app.Listen(":" + port))
}
