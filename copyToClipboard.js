var copyToClipboard = {
	element: '',
	targetId: '_hiddenCopyText_',
	isInput: '',
	origSelectionStart: '',
	origSelectionEnd: '',
	target: '',
	text: '',
	currentFocus:'',
	succeed: '',

	inputSetup: function(element) {
		this.element = element;
		this.isInput = element.tagName === "INPUT" || element.tagName === "TEXTAREA";
		if(this.isInput){
			this.target = element;
			this.origSelectionStart = element.selectionStart;
			this.origSelectionEnd 	= element.selectionEnd;
		}else{
			this.target = document.getElementById(this.targetId);
			if(!this.target){
				this.target = document.createElement('textarea');
				this.target.style.position 	= 'absolute';
				this.target.style.left 		= '-9999px';
				this.target.style.top 		='0';
				this.target.id 				= this.targetId;
				document.body.appendChild(this.target);
			}
			this.text = element.html();
			this.target.textContent = this.text;
		}
	},

	selectContent: function(){
		this.currentFocus = document.activeElement;
		this.target.focus();
		this.target.setSelectionRange(0,this.target.value.length);
	},

	copySelection: function(){
		try{
			this.succeed = document.execCommand('copy');
		}catch(e){
			this.succeed = false;
		}
	},

	restoreOriginaFocus: function(){
		if(this.currentFocus && typeof this.currentFocus.focus === 'function'){
			this.currentFocus.focus();
		}
		if(this.isInput){
			this.element.setSelectionRange(this.origSelectionStart,this.origSelectionEnd);
		}else{
			this.target.textContent = '';
		}
	},

	init: function(element){
		this.inputSetup(element);
		this.selectContent();
		this.copySelection();
		this.restoreOriginaFocus();
		if(this.succeed){ toast.display(this.text)};
		return this.succeed;
	}

}