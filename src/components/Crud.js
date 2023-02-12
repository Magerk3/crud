export const Crud = ({ notes, handleDelete }) => {
    return (
        <div className="notes">
            {notes ? (
                notes.map((note) => (
                    <div className="note">
                        <textarea key={note.id} value={note.content}></textarea>
                        <button className='delButton' id={note.id} onClick={handleDelete}>X</button>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
