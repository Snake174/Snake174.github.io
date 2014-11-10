$(document).ready( function() {
  
  function checkEmail( emailAddress ) {
    var sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
    var sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
    var sAtom = '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
    var sQuotedPair = '\\x5c[\\x00-\\x7f]';
    var sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
    var sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
    var sDomain_ref = sAtom;
    var sSubDomain = '(' + sDomain_ref + '|' + sDomainLiteral + ')';
    var sWord = '(' + sAtom + '|' + sQuotedString + ')';
    var sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
    var sLocalPart = sWord + '(\\x2e' + sWord + ')*';
    var sAddrSpec = sLocalPart + '\\x40' + sDomain;
    var sValidEmail = '^' + sAddrSpec + '$';

    var reValidEmail = new RegExp( sValidEmail );

    if (reValidEmail.test( emailAddress ))
      return true;

    return false;
  }

  $.get( 'html/header.txt', function( data ) {
    $('div.header').html( data );
  }, 'text' );

  $.get( 'html/footer.txt', function( data ) {
    $('div.footer').html( data );
  }, 'text' );
  
  $('#[id ^= table_]').dataTable();
  
  $('.QapTcha').QapTcha(
    {
      disabledSubmit: true,
      autoRevert: true,
      autoSubmit: false
    }
  );
  
  $('#contact_form form').live( 'submit', function(e) {
      e.preventDefault();

      var email = $('input[name=email]').val();
      var body = $('#contact_form form #body').val();

      $.ajax( {
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
          'key': 'atuMPWDK1OaYmmxeH_28Lg',
          'message': {
            'from_email': email,
            'to': [
              {
                'email': 'burlachenkomaxim@gmail.com',
                'type': 'to'
              },
              {
                'email': 'jonnysereb@gmail.com',
                'type': 'to'
              }
            ],
            'autotext': 'true',
            'subject': 'http://Snake174.github.io/ - обратная связь',
            'html': body
          }
        }
      } ).done( function( response ) {
        $('#contact_form').html('Письмо успешно отправлено');
      });
    }
  )

} );
