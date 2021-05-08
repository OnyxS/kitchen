
const comment=new Swiper('.comment-slider', {
	slidesPerView: 2,
	slidesPerGroup:2,
	pagination:{
		el:'.swiper-pagination',
		clickable:true,
		slidesPerView: 'auto',
	},
	breakpoints:{
		0:{
			slidesPerView:1,
			slidesPerGroup:1,
		},
		767:{
			slidesPerView:2,
			slidesPerGroup:2,
		},
	},
});

const works=new Swiper('.works-slider',{
	navigation:{
		nextEl:'.swiper-button-next',
		prevEl:'.swiper-button-prev',
	},
});

const popupLinks=document.querySelectorAll('.popup-link');
const body=document.querySelector('body');
const lockPadding=document.querySelectorAll(".lock-padding");

let unlock=true;

const timeout=800;

if(popupLinks.length>0){
	for(let index=0;index<popupLinks.length;index++){
		const popupLink=popupLinks[index];
		popupLink.addEventListener("click",function(e){
			const popupName=popupLink.getAttribute('href').replace('#','');
			const currentPopup=document.getElementById(popupName);
			popupOpen(currentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon=document.querySelectorAll('.close-popup');
if(popupCloseIcon.length>0){
	for(let index=0;index<popupCloseIcon.length;index++){
		const el=popupCloseIcon[index];
		el.addEventListener('click',function(e){
			popupCloseIcon(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(currentPopup){
	if(currentPopup&&unlock){
		const popupActive=document.querySelector('.popup.open');
		if(popupActive){
			popupClose(popupActive,false);
		}
		else{
			bodyLock();
		}
		currentPopup.classList.add('open');
		currentPopup.addEventListener("click",function(e){
			if(!e.target.closest('.popup__content')){
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive,doUnlock=true){
	if(unlock){
		popupActive.classList.remove('open');
		if(doUnlock){
			bodyUnlock();
		}
	}
}

function bodyLock(){
	unlock=false;
	setTimeout(function(){
		unlock=true;
	},timeout);
}

function bodyUnlock(){
	

	unlock=false;
	setTimeout(function(){
		unlock=true;
	},timeout);
}

document.addEventListener('keydown',function(e){
	if(e.which===27){
		const popupActive=document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});

(function(){
	if(!Element.prototype.closest){
		Element.prototype.closest=function(css){
			var node=this;
			while(node){
				if(node.matches(css)) return node;
				else node=node.parentElement;
			}
			return null;
		};
	}
})();

(function(){
	if(!Element.prototype.matches){
		Element.prototype.matches=Element.prototype.matchesSelector||Element.prototype.webkitMatchesSelector||
		Element.prototype.mozMathesSelector||
		Element.prototype.msMathesSelector;
	}
})();