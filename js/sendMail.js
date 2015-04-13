$(document).ready( function() {

  $('.QapTcha').QapTcha(
    {
      disabledSubmit: true,
      autoRevert: true,
      autoSubmit: false
    }
  );

  //****************************************************************
  $('#contact_form').bootstrapValidator( {
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      first_name: {
        validators: {
          stringLength: {
            min: 2,
            message: 'Имя должно быть более 2 символов'
          },
          notEmpty: {
            message: 'Введите имя'
          }
        }
      },
      email: {
        validators: {
          notEmpty: {
            message: 'Введите E-Mail'
          },
          emailAddress: {
            message: 'Введённый E-Mail некорректен'
          }
        }
      },
      comment: {
        validators: {
          stringLength: {
            min: 10,
            message: 'Длина сообщения должна быть более 10 символов'
          },
          notEmpty: {
            message: 'Введите сообщение'
          }
        }
      }
    }
  } )
  .on( 'success.form.bv', function(e) {
    e.preventDefault();

    var name = $('input[name=first_name]').val();
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
          'subject': 'Статьи, игры, программы - Обратная связь',
          'html': 'Письмо от <b>' + name + '</b><br/><br/>' + body + '<br/><br/><a href="http://snake174.github.io/" target="_blank">Статьи, игры, программы</a>'
        }
      }
    } ).done( function( response ) {
      $('#contact-form-wrap').html('<font color=#00AA00>Письмо успешно отправлено. Спасибо за посещение нашего ресурса.</font>');
    } );
  } );
  //****************************************************************

  /*function checkEmail( emailAddress )
  {
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

  $('#contact_form form').live( 'submit', function(e) {
      e.preventDefault();

      var email = $('input[name=email]').val();
      var body = $('#contact_form form #body').val();

      if (email == '' || body == '')
      {
        $('.contacts_status').html('<b><font color=#AA0000>Введите данные</font></b>');
        return;
      }

      if (checkEmail( email ) == false)
      {
        $('.contacts_status').html('<b><font color=#AA0000>Некорректный E-mail</font></b>');
        return;
      }

      if (body.length <= 10)
      {
        $('.contacts_status').html('<b><font color=#AA0000>Слишком короткое сообщение</font></b>');
        return;
      }

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
            'subject': 'Статьи, игры, программы - Обратная связь',
            'html': body + '<br><br><a href="snake174.github.io" target="_blank">Статьи, игры, программы</a>'
          }
        }
      } ).done( function( response ) {
        $('#contact_form').html('<font color=#00AA00>Письмо успешно отправлено. Спасибо за посещение нашего ресурса.</font>');
      });
    }
  )*/

} );
