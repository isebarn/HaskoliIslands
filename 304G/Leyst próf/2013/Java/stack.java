/*
	Klárað: Já
*/
public class stack<T extends Comparable>{

	class Column<X>{
		X unit;
		Column<X> previous;
	}

	Column<T> newStack;

	public stack(){
		newStack = null;
	}

	public void push(T x){
		Column<T> temp = new Column<T>();
		temp.unit = x;
		temp.previous = newStack;
		newStack = temp;
	}

	public T pop(){
		T result = newStack.unit;
		newStack = newStack.previous;
		return result;
	}

	public boolean isEmpty(){
		if(newStack != null) return false;
		return true;
	}
	
	public static void main(String[] args) {
		stack a = new stack();
		System.out.println(a.isEmpty());
		a.push(1);
		a.push(2);
		System.out.println(a.isEmpty());
		a.push(3);
		a.push(2);
		a.push(4);
		System.out.println(a.pop());
		System.out.println(a.pop());
		System.out.println(a.pop());
		System.out.println(a.pop());
		System.out.println(a.pop());
	}
}