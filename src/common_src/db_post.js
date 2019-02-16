'use strict';
	
export async function getPostList(db, userid) {
	let result = await db.query("SELECT id, title, authorid FROM posts WHERE public=1 OR authorid=?",
									[ userid ]);
	
	return result;
}


export async function getPost(db, userid, postid) {
	let result = await db.query("SELECT p.id, p.title, p.content, p.locked AS isLocked, public AS isPublic, " +
									"		p.authorid, ua.username AS author FROM posts p " + 
									"	INNER JOIN useraccounts ua ON ua.id=p.authorid " +
									"	WHERE p.id=? AND (p.public=1 OR p.authorid=?)",
									[ postid, userid ]);

	return result;
}

export async function createPost(db, userid, title, content, islocked = 0, ispublic = 0) {
	let result = await db.query("INSERT INTO posts (authorid, title, content, locked, public) " +
									"VALUES (?, ?, ?, ?, ?)",
									[ userid, title, content, islocked, ispublic ]);
	
	let insertid = await connection.query("SELECT LAST_INSERT_ID() AS lii");
	return insertid[0].lii;
}

export async function updatePost(db, userid, postid, title, content, islocked = 0, ispublic = 0) {
	let result = await db.query("UPDATE posts SET title=?, content=?, locked=?, public=? " +
									"	WHERE id=? AND authorid=?",
									[ title, content, islocked, ispublic, postid, userid ]);
	
	return result;
}

export async function deletePost(db, postid) {
	let result = await db.query("DELETE FROM posts " +
									"	WHERE id=?",
									[ postid ]);
	
	return 1;
}

