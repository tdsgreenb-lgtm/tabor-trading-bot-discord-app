const dbUtils = require('./db');

module.exports = {
    createTrade: (userId, username, item, details, price) => {
        const stmt = dbUtils.prepare(`INSERT INTO trades (user_id, username, item, details, price, created_at) VALUES (?, ?, ?, ?, ?, ?)`);
        return stmt.run(userId, username, item, details, price, Date.now()).lastInsertRowid;
    },
    getTrades: (limit = 25) => dbUtils.prepare(`SELECT * FROM trades ORDER BY created_at DESC LIMIT ?`).all(limit),
    searchTrades: (term, limit = 25) => {
        const t = `%${term}%`;
        return dbUtils.prepare(`SELECT * FROM trades WHERE item LIKE ? OR details LIKE ? ORDER BY created_at DESC LIMIT ?`).all(t, t, limit);
    },
    getUserTrades: (userId) => dbUtils.prepare(`SELECT * FROM trades WHERE user_id = ? ORDER BY created_at DESC`).all(userId),
    deleteTrade: (id, userId) => dbUtils.prepare(`DELETE FROM trades WHERE id = ? AND user_id = ?`).run(id, userId).changes > 0,
    reportTrade: (tradeId, reporterId, reason) => dbUtils.prepare(`INSERT INTO reports (trade_id, reporter_id, reason, created_at) VALUES (?, ?, ?, ?)`).run(tradeId, reporterId, reason, Date.now()).lastInsertRowid,
    verifyUser: (userId) => dbUtils.prepare(`INSERT OR REPLACE INTO verified (user_id, verified_at) VALUES (?, ?)`).run(userId, Date.now()),
    isVerified: (userId) => !!dbUtils.prepare(`SELECT 1 FROM verified WHERE user_id = ?`).get(userId)
};
