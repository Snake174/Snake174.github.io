$(function() {
  const OS = require('os').type()
  const VERSION = 2
  var fs = require('fs')
  var path = require('path')
  var http = require('http')
  var execFile = require('child_process').execFile
  var async = require('async')
  var unzip = require('unzip')
  var url = require('url')
  var config = require('./config.json')
  // fs.writeFileSync('./config.json', JSON.stringify( config, null, 2 ) )

  var consolesMenu = $('#consoles-menu')
  var emulatorsMenu = $('#emulators-menu')
  var gamesList = $('#games-list')
  var mainSegment = $('#main')
  var gameDetail = $('#game-detail')
  var gameCountInfo = $('#game-count-info')
  var gamesTitles = []
  var curIndex = 0
  var curCount = 0
  var curConsole = '';
  var curData = null
  var ext = null
  var curDownloads = 0
  var needDownload = false

  $('.ui.dropdown').dropdown()
  $('.menu .item').tab()

  try {
    fs.mkdirSync( path.join( __dirname, 'data', 'emulators', OS ) )
  } catch(e) {
  }

  var getDirectories = (srcpath) => {
    if (!fs.existsSync( srcpath )) return []

    return fs.readdirSync( srcpath ).filter( (file) => {
      return fs.statSync( path.resolve( srcpath, file ) ).isDirectory()
    } )
  }

  var download = (url, dest) => {
    var file = fs.createWriteStream( dest )

    return new Promise( (resolve, reject) => {
      var responseSent = false

      http.get( url, response => {
        response.pipe( file )

        file.on( 'finish', () => {
          file.close( () => {
            if (responseSent) return
            responseSent = true
            resolve()
          } )
        } )
      } ).on( 'error', err => {
        if (responseSent) return
        responseSent = true
        reject( err )
      } )
    } )
  }

  var q = async.queue( (task, cb) => {
    download( task.URL, task.target ).then( () => {
      fs.createReadStream( task.target ).pipe( unzip.Extract( { path: path.join( __dirname, 'data', 'emulators', OS ) } ) ).on( 'close', () => {
        fs.unlinkSync( task.target )
        cb()
      } )
    } )
  }, 5 )

  var playGame = (game) => {
	  let emul = $('#emulators-menu > .item.active').text().trim()

	  execFile( path.join( __dirname, 'data', 'emulators', OS, curConsole, emul, emul ), [game], (err, data) => {
      if (err) {
        console.log( err )
      } else {
		    console.log( data.toString() )
	    }
    } )
  }

  var showGame = (gameData) => {
	  let images = ''

	  if (gameData.images.length > 0) {
	    images += '<p><div class="ui link cards">'

	    for (let ind = 0, c = gameData.images.length; ind < c; ++ind) {
	      images += '<div class="card"><div class="image"><img src="' + gameData.images[ ind ] + '" /></div></div>'
	    }

	    images += '</div></p>'
	  }

  	let html = '<h3>' + gameData.title + '</h3>'
	    + '<p>' + gameData.description + '</p>'
	    + images

	  gameDetail.html( html )
	  gameCountInfo.html( (curIndex + 1) + ' / ' + curCount )
  }

  $('#prev').click( () => {
  	if (curData === null) return
	  --curIndex
	  if (curIndex < 0) {
	    curIndex = curCount - 1
	  }
	  showGame( curData[ curIndex ] )
  } )

  $('#next').click( () => {
	  if (curData === null) return
	  ++curIndex
	  if (curIndex > curCount - 1) {
	    curIndex = 0
	  }
	  showGame( curData[ curIndex ] )
  } )

  $('#play-game').click( () => {
	  if (curData === null) return

	  if (fs.existsSync( path.join( __dirname, 'data', 'games', curData[ curIndex ].title + ext[ curConsole ] ) )) {
	    playGame( path.join( __dirname, 'data', 'games', curData[ curIndex ].title + ext[ curConsole ] ) )
    } else {
	    let fileName = path.join( __dirname, 'data', 'games', curData[ curIndex ].title + '.zip' )

      download( curData[ curIndex ].download, fileName ).then( () => {
        fs.createReadStream( fileName ).pipe( unzip.Extract( { path: path.join( __dirname, 'data', 'games' ) } ) ).on( 'close', () => {
          fs.unlinkSync( fileName )
          playGame( path.join( __dirname, 'data', 'games', curData[ curIndex ].title + ext[ curConsole ] ) )
        } )
      } )
	  }
  } )

  $('#add-to-favourites').click( () => {
  } )

  $.get( 'http://snake174.github.io/programs/consoles-games/data/main.json', (data) => {
    if (data.version > VERSION) {
      fs.unlinkSync( path.join( __dirname, 'index.html' ) )
      fs.unlinkSync( path.join( __dirname, 'js', 'script.js' ) )

      download( 'http://snake174.github.io/programs/consoles-games/data/src/index.html', path.join( __dirname, 'index.html' ) ).then( () => {
        download( 'http://snake174.github.io/programs/consoles-games/data/src/script.js', path.join( __dirname, 'js', 'script.js' ) ).then( () => {
          $('.ui.basic.modal').modal('show')
        } )
      } )
    }

	  ext = data.ext
    curDownloads = data.consoles.length

    for (let i = 0; i < data.consoles.length; ++i) {
      if (!fs.existsSync( path.join( __dirname, 'data', 'emulators', OS, data.consoles[i].tag ) )) {
        needDownload = true
        let fileName = path.join( __dirname, 'data', 'emulators', OS, data.consoles[i].tag + '.zip' )
        let URL = 'http://snake174.github.io/programs/consoles-games/data/emulators/' + OS + '/' + data.consoles[i].tag + '.zip'

        q.push( { URL: URL, target: fileName }, () => {
          --curDownloads

          if (curDownloads == 0) {
            $('#consoles-menu > button')[0].click()
          }
        } )
      }
    }

    $.each( data.consoles, (i, e) => {
	    let btn = $('<button/>', { 'class': 'ui button', 'data-tooltip': e.tag, 'data-position': 'bottom left' } )
        .click( () => {
		      mainSegment.addClass('loading')
		      curConsole = e.tag
		      let emulators = getDirectories( path.join( __dirname, 'data', 'emulators', OS, curConsole ) )
		      emulatorsMenu.empty()

		      $.each( emulators, (emulIndex, emulName) => {
			      let emul = $('<div/>', { class: (emulIndex == 0 ? 'item active' : 'item'), html: emulName } )
			      emul.appendTo( emulatorsMenu )
		      } )

		      while (gamesTitles.length > 0) {
            gamesTitles.pop()
          }

		      gamesList.empty()

		      $.get( e.data, (gameData) => {
			      curData = gameData
			      curIndex = 0
		        curCount = gameData.length

			      $.each( gameData, (ii, ee) => {
			        gamesTitles.push( { title: ee.title, id: ii } )

			        let gameBtn = $('<a/>', { class: 'item', text: ee.title, ind: ii } )
			          .click( () => {
				          curIndex = ii
				          showGame( gameData[ ii ] )
				          $('html,body').animate( { scrollTop: 0 }, 100 )
				        } )

			        gameBtn.appendTo( gamesList )
			      } )

			      $('.ui.search').search( {
              source: gamesTitles,
			        searchFullText: false,
			        cache: false,
			        onSelect: (result, response) => {
				        curIndex = result.id
				        showGame( gameData[ result.id ] )
			        }
            } )

			      showGame( curData[ curIndex ] )
		      } )

		      mainSegment.removeClass('loading')
		    } )

	    btn.prepend( $('<img/>', { src: e.icon } ) )
	    btn.appendTo( consolesMenu )
	  } )

    if (!needDownload) {
      $('#consoles-menu > button')[0].click()
    }
  } )
} )
