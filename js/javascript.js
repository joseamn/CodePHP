(function readyJS (win, doc) {
	if (doc.querySelectorAll ('.deletar')) {
		for (let i=0; i<doc.querySelectorAll('.deletar').lenght; i++){
			
			doc.querySelectorAll('.deletar')[i].addEventListener
			
			(
				'click', function(event) 
				
				{
					
				if (confirm("DESEJA MESMO APAGAR ESTE DADO? "))
				
				{
					return true
				}
				
				else
				
				{ 
				event.preventDefault()
				
				}
			})	
		}
	}
}
)(window,document) 