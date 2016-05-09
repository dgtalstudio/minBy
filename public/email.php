<?php
require_once dirname(__FILE__).'/vendor/autoload.php';

function param($param, $v = false, $from = true) {
  $var = ($from) ? $_POST : $_SERVER;
  return isset($var[$param]) && $var[$param] ? $var[$param] : $v;
}

function isAjax() {
  return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'minByXMLHttpRequest';
}

function buildMessage() {
  $templatePlain = implode('', [
    'Nome: {nome}', "\n",
    'Email: {email}', "\n",
    'Telefone: {telefone}', "\n",
    'Mensagem:', "\n",
    '{msg}'
  ]);

  $templateHTML = implode('', [
    '<div><b>Nome</b> {nome}</div>',
    '<div><b>Email</b> {email}</div>',
    '<div><b>Telefone</b> {telefone}</div>',
    '<div><b>Mensagem</b><br>',
    '<pre>{msg}</pre></div>'
  ]);

  $dados = [
    'nome'=> param('nome'),
    'email'=> param('email'),
    'telefone'=> param('telefone'),
    'msg'=> param('msg'),
  ];

  $plain = preg_replace_callback('/\{(.*?)\}/i', function($matches) use ($dados) {
    return $dados[$matches[1]];
  }, $templatePlain);

  $html = preg_replace_callback('/\{(.*?)\}/i', function($matches) use ($dados) {
    return $dados[$matches[1]];
  }, $templateHTML);

  return [$plain, $html];
}

// Multiple domain
// $domain = 'http://minby.hospedagemdesites.ws';
$domain = 'http://minby.dgtalstudio.com';
$origin = param('HTTP_ORIGIN', $domain, false);
$pattern = '/^http(s)?:\/\/(.+\.)?(localhost\:1234|minby\.hospedagemdesites\.ws|minby\.dgtalstudio\.com)$/i';
$res = preg_match($pattern, $origin);
$origin = ($res) ? $origin : $domain;

header("Access-Control-Allow-Origin: {$origin}");
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-MD5, X-Alt-Referer, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header("Content-Type: application/json; charset=utf-8");

$response = [
  'success' => false,
  'message' => 'Falha ao enviar',
  'debug' => null
];

$minbyV = param('minbyV', '6f4922f45568161a8cdf4ad2299f6d23');

// Debug
$response['debug'] = [$_POST, $minbyV, isAjax()];

if (isAjax() && $minbyV === '6f4922f45568161a8cdf4ad2299f6d23') {
  $nome = param('nome');
  $email = param('email');
  $from = [$email => $nome];
  $msg = buildMessage();
  $transport = \Swift_MailTransport::newInstance();
  $mailer = \Swift_Mailer::newInstance($transport);
  $message = \Swift_Message::newInstance()
    ->setSubject('[Contato] minBy')
    ->setFrom(['no-reply@minby.com.br'])
    ->setReplyTo($from)
    ->setTo(['lagden@dgtalstudio.com', 'toledo@dgtalstudio.com', 'contato@minby.com.br'])
    ->setBody($msg[1], 'text/html')
    ->addPart($msg[0], 'text/plain');

  $result = $mailer->send($message);
  if ($result) {
    $response['success'] = true;
    $response['message'] = 'Enviado com sucesso.';
  } else {
    $response['message'] = 'Problemas no servidor. Tente mais tarde.';
    $response['debug'] = $result;
  }
}

echo json_encode($response);
