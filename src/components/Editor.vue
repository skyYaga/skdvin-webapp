<template>
  <div>
    <v-row>
      <v-col>
        <div class="editor">
          <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
            <div class="menubar">
              <v-btn
                icon
                :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                @click="commands.heading({ level: 1 })"
              >
                <v-icon>mdi-format-header-1</v-icon>
              </v-btn>
              <v-btn
                icon
                :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                @click="commands.heading({ level: 2 })"
              >
                <v-icon>mdi-format-header-2</v-icon>
              </v-btn>
              <v-btn
                icon
                :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                @click="commands.heading({ level: 3 })"
              >
                <v-icon>mdi-format-header-3</v-icon>
              </v-btn>
              <v-btn
                icon
                :class="{ 'is-active': isActive.bold() }"
                @click="commands.bold"
              >
                <v-icon>mdi-format-bold</v-icon>
              </v-btn>
              <v-btn
                icon
                :class="{ 'is-active': isActive.italic() }"
                @click="commands.italic"
              >
                <v-icon>mdi-format-italic</v-icon>
              </v-btn>
              <v-btn
                icon
                :class="{ 'is-active': isActive.underline() }"
                @click="commands.underline"
              >
                <v-icon>mdi-format-underline</v-icon>
              </v-btn>
              <v-btn
                icon
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
              >
                <v-icon>mdi-format-list-bulleted</v-icon>
              </v-btn>
              <v-btn
                icon
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list"
              >
                <v-icon>mdi-format-list-numbered</v-icon>
              </v-btn>
              <v-btn icon @click="commands.horizontal_rule">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-btn icon @click="commands.undo">
                <v-icon>mdi-undo</v-icon>
              </v-btn>
              <v-btn icon @click="commands.redo">
                <v-icon>mdi-redo</v-icon>
              </v-btn>
            </div>
          </editor-menu-bar>

          <editor-content class="editor__content" :editor="editor" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import {
  Heading,
  Bold,
  Italic,
  Underline,
  ListItem,
  BulletList,
  OrderedList,
  HorizontalRule,
  History,
} from "tiptap-extensions";

export default {
  components: {
    EditorMenuBar,
    EditorContent,
  },
  props: {
    editorHtml: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  watch: {
    editorHtml(newVal) {
      this.editor.setContent(newVal, false, { preserveWhitespace: "full" });
    },
  },
  mounted() {
    this.editor = new Editor({
      content: this.editorHtml,
      extensions: [
        new Heading({ levels: [1, 2, 3] }),
        new Bold(),
        new Italic(),
        new Underline(),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new HorizontalRule(),
        new History(),
      ],
    });
    this.editor.on("update", ({ getHTML }) => {
      // get new content on update
      this.$emit("editor-update", getHTML());
    });
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy();
  },
};
</script>

<style lang="scss">
.ProseMirror {
  outline: none;
  border-style: solid;
  border-width: 1px;
}
</style>
