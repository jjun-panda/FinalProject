package org.project.back.board.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/file")
public class FileApiController {

    // 파일을 업로드할 디렉터리 경로
//    private final String uploadDir = "https://jjundesign.gabia.io/springboot_img/";
	private final String uploadDir = "/Users/jjun/img/";

    /**
     * 에디터 이미지 업로드
     * @param image 파일 객체
     * @return 업로드된 파일명
     */
	@PostMapping("/image-upload")
	public String uploadEditorImage(@RequestParam("image") final MultipartFile image) {
		// 최대 용량 (5MB)
	    long maxFileSize = 5 * 1024 * 1024;

	    if (image.isEmpty()) {
	        return "";
	    }

	    // 이미지 용량 확인
	    if (image.getSize() > maxFileSize) {
	        return "5MB 용량초과";
	    }

	    String orgFilename = image.getOriginalFilename();                             // 원본 파일명
	    String cleanFilename = orgFilename.replace(" ", "");                         // 공백 제거
	    String extension = cleanFilename.substring(cleanFilename.lastIndexOf(".") + 1);    // 확장자
	    String saveFilename = System.currentTimeMillis() + "." + extension;                // 디스크에 저장할 파일명 (시간 밀리초 값 + 원본 파일명)
	    String fileFullPath = Paths.get(uploadDir, saveFilename).toString();            // 디스크에 저장할 파일의 전체 경로
	    System.out.println("저장된 파일경로: " + fileFullPath);

	    // uploadDir에 해당되는 디렉터리가 없으면, uploadDir에 포함되는 전체 디렉터리 생성
	    File dir = new File(uploadDir);
	    if (dir.exists() == false) {
	        dir.mkdirs();
	    }

	    try {
	        // 파일 저장 (write to disk)
	        File uploadFile = new File(fileFullPath);
	        image.transferTo(uploadFile);
            String fileUrl = "http://localhost:8888/file/img?filename=" + saveFilename;
            return fileUrl;

	    } catch (IOException e) {
	        throw new RuntimeException(e);
	    }
	}


    /**
     * 디스크에 업로드된 파일을 byte[]로 반환
     * @param filename 디스크에 업로드된 파일명
     * @return image byte array
     */
    @GetMapping(value = "/img", produces = { MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
    public ResponseEntity<byte[]> printEditorImage(@RequestParam final String filename) {
        // 업로드된 파일의 전체 경로
        String fileFullPath = Paths.get(uploadDir, filename).toString();

        // 파일이 없는 경우 예외 throw
        File uploadedFile = new File(fileFullPath);
        if (uploadedFile.exists() == false) {
            throw new RuntimeException();
        }

        try {
            // 이미지 파일을 byte[]로 변환 후 반환
            byte[] imageBytes = Files.readAllBytes(uploadedFile.toPath());
            return ResponseEntity.ok().body(imageBytes);

        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}