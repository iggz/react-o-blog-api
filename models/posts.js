const db = require('./conn');

// TODO = Make the update route be more robust

class Posts {
    constructor(id, title, author, content) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.content = content;
    }

    static async getAll() {
        try {
            const response = await db.any(`
            select * from posts;
            `)
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getById(p_id) {
        try {
            const response = await db.one(`
            select * from posts where id = ${p_id}
            `);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async removeEntry(p_id) {
        try {
            const response = await db.result(`delete from posts where id = ${p_id}`);
            return response;
        } catch (err) {
            return  err.message;
        }
    }

    static async createEntry(ptitle, pcontent, pauthor_id) {
        
        try {
            const response = await db.result(`
            INSERT INTO posts(title, content, author_id)
            VALUES ('${ptitle}', '${pcontent}', ${pauthor_id})
            `)
            console.log('createEntry has ran: ', pauthor_id)
            return response;
        } catch(err) {
            return err.message;
        }
    }

    static async updateEntry(id, title, content, author_id) {
        const query = `UPDATE posts 
                SET ${column} = ${content}
                WHERE
                id = '${id}'`;
        try {
            const response = await db.result(query);
            return response;
            
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Posts;