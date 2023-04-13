import { Request, Response } from "express";
import formidable from "formidable";
import { logger } from "../logger";
import { Memo } from "../models";
import { MemoService } from "../services/MemoService";
import { form, parse } from "../util";
import { Server as SocketIO } from "socket.io";

export class MemoController {
  constructor(private memoService: MemoService, private io: SocketIO) {}

  getMemos = async (req: Request, res: Response) => {
    try {
      const result = await this.memoService.getMemos();
      const memoList: Memo[] = result.rows;
      res.json(memoList);
    } catch (e) {
      logger.error(e);
      res.status(500).json({ msg: "[MEM001]: Failed to get Memos" });
    }
  };

  postMemos = async (req: Request, res: Response) => {
    const [fields, files] = await parse(form, req);
    await this.memoService.addMemo(
      fields.text + "",
      (files.image as formidable.File)?.newFilename
    );
    this.io.emit("new-memo", "new-memo-posted");
    res.json({ success: true });
  };

  updateMemo = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const newContent = req.body.text;
    await this.memoService.updateMemo(id, newContent);
    res.json({ success: true });
  };

  deleteMemo = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    await this.memoService.deleteMemo(id);
    res.json({ success: true });
  };
}
