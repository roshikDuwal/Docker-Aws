import { Editor, type OnMount } from "@monaco-editor/react";
import { useMemo } from "react";
import { MonacoBinding } from "y-monaco";
import { SocketIOProvider } from "y-socket.io";
import * as Y from "yjs";

function App() {

  const yDoc = useMemo(() => new Y.Doc(), []); //store data in key value pair
  const yText = useMemo(() => yDoc.getText("monaco"), [yDoc]);

  const handleMount: OnMount = (editor) => {
    const model = editor.getModel();
    if (!model) return;

    const provider = new SocketIOProvider(
      "http://localhost:3000",
      "monaco",
      yDoc,
      { autoConnect: true },
    );

    new MonacoBinding(
      yText,
      model,
      new Set([editor]),
      provider.awareness,
    );
  };

  return (
    <main className="bg-gray-950 w-full h-screen flex gap-4">
      <aside className="h-full w-1/4 bg-amber-50 rounded-lg" />
      <section className="w-3/4 bg-neutral-800 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          language="typescript"
          theme="vs-dark"
          onMount={handleMount}
        />
      </section>
    </main>
  );
}

export default App;
