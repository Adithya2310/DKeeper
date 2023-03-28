import List "mo:base/List";
import Debug "mo:base/Debug"

actor Dkeeper{
  public type Note={
    title: Text;
    content: Text;
  };

  stable var notes:List.List<Note> =List.nil<Note>();

  public func createNote(titleText:Text,contentText:Text){
    let newNote:Note ={
      title= titleText;
      content= contentText
    };
    notes:=List.push(newNote,notes);
    Debug.print(debug_show(notes));
  };

  public query func getNote():async [Note]{
    return List.toArray(notes);
  };
  
  public func deletNote(id: Nat){
    let arr1=List.take(notes,id);
    let arr2=List.drop(notes,id+1);
    notes:=List.append(arr1,arr2);
    // Debug.print(debug_show(List.append(arr1,arr2)));
  };
};