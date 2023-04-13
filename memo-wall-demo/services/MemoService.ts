import { Client } from "pg";

export class MemoService {
  constructor(private client: Client) {}

  async getMemos() {
    return await this.client.query(
      "select memos.content as text,memos.id, memos.image from memos order by created_at desc limit 10"
    );
  }

  async addMemo(text: string, filename: string) {
    await this.client.query(
      "insert into memos (content, image, created_at) values ($1, $2, now())",
      [text, filename]
    );
  }

  async updateMemo(id: number, content: string) {
    await this.client.query("update memos set content = $1 where id = $2", [
      content,
      id,
    ]);
  }

  async deleteMemo(id: number) {
    await this.client.query("delete from memos where id = $1", [id]);
  }
}
