$(document).ready( function() {

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
    var textToBot = $('input[name=text-to-bot]').val();
    var body = $('textarea#comment').val();
    var bodyStyle =
      'background: none repeat 0 0 #ffffff;' +
      'border: 1px solid #bcd0d5;' +
      'border-radius: 5px;' +
      '-moz-border-radius: 5px;' +
      '-webkit-border-radius: 5px;' +
      'box-shadow: 0 1px 2px 0 rgba(88, 112, 118, 0.3);' +
      '-moz-box-shadow: 0 1px 2px 0 rgba(88, 112, 118, 0.3);' +
      '-webkit-box-shadow: 0 1px 2px 0 rgba(88, 112, 118, 0.3);' +
      'margin: 0 0 5px 0;' +
      'padding: 5px;';

    if (textToBot.length > 0)
      return;

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
          'html': 'Письмо от <b>' + name + '</b><br/><br/><div style="' + bodyStyle + '">' + body + '</div><br/><a href="http://snake174.github.io/" target="_blank">Статьи, игры, программы</a>'
        }
      }
    } ).done( function( response ) {
      $('#contact-form-wrap').html('<font color=#00AA00>Письмо успешно отправлено. Спасибо за посещение нашего ресурса.</font>');
    } ).fail( function( jqXHR, textStatusresponse, q, t ) {
      var r = jQuery.parseJSON( response.responseText );
      $('#contact-form-wrap').html('Ошибка: ' + r.Message);
    } );
  } );

} );
