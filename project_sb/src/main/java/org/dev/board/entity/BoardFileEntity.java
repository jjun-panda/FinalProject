package org.dev.board.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "board_file_db")
public class BoardFileEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String fileOriginalName;

    @Column
    private String fileStoredName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private BoardEntity boardEntity;

    public static BoardFileEntity toBoardFileEntity(BoardEntity boardEntity, String fileOriginalName, String fileStoredName) {
        BoardFileEntity boardFileEntity = new BoardFileEntity();
        boardFileEntity.setFileOriginalName(fileOriginalName);
        boardFileEntity.setFileStoredName(fileStoredName);
        boardFileEntity.setBoardEntity(boardEntity);
        return boardFileEntity;
    }
}













