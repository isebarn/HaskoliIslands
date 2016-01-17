// Hönnunarskjal fyror forgangsbiðröð 
//
//



public class priorityQueue <T extends Comparable>{

	class queueLink<X>{
		X value;
		queueLink<X> next;
	}

	queueLink<T> mainQueue;

	public priorityQueue(){
		mainQueue = null;
	}

	public void push(T value){
		queueLink<T> newQueue = new queueLink<T>();
		newQueue.value = value;

		if(mainQueue == null || mainQueue.value.compareTo(value) > 0){
			newQueue.next = mainQueue;
			mainQueue = newQueue;
			return;
		}

		queueLink<T> temporary = mainQueue;

		while(temporary.next != null && temporary.next.value.compareTo(value) < 0){
			temporary = temporary.next;
		}

		newQueue.next = temporary.next;
		temporary.next = newQueue;
	}

	public T pop(){
		T value = mainQueue.value;
		mainQueue = mainQueue.next;
		return value;
	}


	public static void main(String[] args) {
		priorityQueue mexico = new priorityQueue();
		mexico.push(5);
		mexico.push(2);
		mexico.push(7);
		mexico.push(1);
		mexico.push(4);
		mexico.push(2);
		System.out.println(mexico.pop());
		System.out.println(mexico.pop());
		System.out.println(mexico.pop());
		System.out.println(mexico.pop());
		System.out.println(mexico.pop());
		System.out.println(mexico.pop());
	}
}