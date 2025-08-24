const application = Vue.createApp({
    name: "VueJS v3 - Первый блок",

    data() {
        return {
            notes: [],
            noteTitle: '',
            isPrimaryChecked: false,
            placeholder: "Введите название заметки",
            sortDirection: "desc",
        }
    },
    methods: {
        addNote() {
            if (this.noteTitle.trim() === "") return;

            this.notes.unshift({
                id: Date.now(),
                title: this.noteTitle,
                isPrimary: this.isPrimaryChecked,
            })

            this.noteTitle = '';
            this.isPrimaryChecked = false;
        },

        handleEnter() {
            this.addNote();
        },

        onCreateFirstNoteClick() {
            this.noteTitle = 'Моя первая заметка';
            this.$refs["noteTitleInput"].focus();
        },

        onDeleteNoteClick(noteId) {
            this.notes = this.notes.filter((note) => note.id !== noteId);
        },
    },
    computed: {
        // получить общее количество символов во всех названиях заметок
        getSymbolsCountFromTitles() {
            let count = 0;

            this.notes.forEach(note => {
                count += note.title.length;
            })

            return count.toString();
        },
        // сортировать заметки
        sortedNotes() {
            console.log("сортировка заметок...")

            if (this.sortDirection === "desc") return this.notes;

            return [...this.notes].reverse();
        }
    },
    watch: {
        noteTitle(newTitle) {
            // запретить символы < и >
            if (newTitle.includes("<") || newTitle.includes(">")) {
                newTitle = newTitle.substring(0, newTitle.length - 1);
            }

            this.noteTitle = newTitle;
        }
    }
})

application.mount("#app");