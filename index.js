let stands;

function loadStand() {
  [...document.querySelectorAll( 'button' )].map( a => {
    a.parentNode.removeChild(a);
  });

  const randomStand = stands[rand(0,stands.length-1)];
  standImage = randomStand.image;
  standName = randomStand.name;

  const imgContainer = document.querySelector( '.image img' );
  imgContainer.src = standImage;

  const otherStands = [];
  while( otherStands.length <= 3 ) {
    const r = rand( 0, stands.length - 1 );
    if ( randomStand !== stands[r] ) otherStands.push( stands[r].name );
  }
  otherStands.push( standName );
  otherStands.sort(function() { return 0.5 - Math.random(); });

  otherStands.map( stand => {
    let correct = false;
    if ( stand === standName ) correct = true;

    createOption( stand, correct );
  });

  [...document.querySelectorAll( 'button' )].forEach( button => {
    button.addEventListener( 'click', ( e ) => {
      console.log( e.target.value );
      const combo = document.querySelector( '#combo' );
      if ( e.target.value == 'true' ) {
        combo.innerText++;
      }
      else {
        combo.innerText = '0';
        alert( 'you fell for it fool' );
      }
      loadStand();
    });
  });
}

const rand = (a, b) => Math.floor(Math.random() * b) + a;

function createOption( stand, correct ) {
  const button = document.createElement( 'button' );
  button.value = correct;
  button.innerText = stand;

  const container = document.querySelector( '.options' );
  container.appendChild( button );
}

async function init() {
  stands = await fetch( './stands.json' ).then( blob => blob.json() );
  loadStand();
}

document.onload = init();
