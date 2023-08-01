package org.project.back.board.domain;

public class Board {

	private int seq;
	private String email;
	
	private int ref;
	private int step;
	private int depth;
	
	private String title;
	private String content;
	private String writeDate; // 작성일
	
	private int del;
	private int readCount; // 조회수
	
	public Board() {
	}

	public Board(int seq, String email, int ref, int step, int depth, String title, String content, String writeDate, int del,
			int readCount) {
		super();
		this.seq = seq;
		this.email = email;
		this.ref = ref;
		this.step = step;
		this.depth = depth;
		this.title = title;
		this.content = content;
		this.writeDate = writeDate;
		this.del = del;
		this.readCount = readCount;
	}

	public Board(String email, String title, String content) {
		super();
		this.email = email;
		this.title = title;
		this.content = content;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public int getRef() {
		return ref;
	}

	public void setRef(int ref) {
		this.ref = ref;
	}

	public int getStep() {
		return step;
	}

	public void setStep(int step) {
		this.step = step;
	}

	public int getDepth() {
		return depth;
	}

	public void setDepth(int depth) {
		this.depth = depth;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getWriteDate() {
		return writeDate;
	}

	public void setWriteDate(String writeDate) {
		this.writeDate = writeDate;
	}

	public int getDel() {
		return del;
	}

	public void setDel(int del) {
		this.del = del;
	}

	public int getReadCount() {
		return readCount;
	}

	public void setReadCount(int readCount) {
		this.readCount = readCount;
	}

	@Override
	public String toString() {
		return "BoardDto [seq=" + seq + ", email=" + email + ", ref=" + ref + ", step=" + step + ", depth=" + depth + ", title="
				+ title + ", content=" + content + ", writeDate=" + writeDate + ", del=" + del + ", readCount=" + readCount
				+ "]";
	}
	
}
