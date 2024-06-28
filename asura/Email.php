<?php
/**
 * 邮件类库
 */

namespace asura;

use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mime\Email as EmailService;

class Email
{

    private $mailer;

    /**
     * 获取Mailer对象
     * @param $username //邮箱用户名
     * @param $password //密码
     * @param $host //主机
     * @param int $port //端口
     */
    public function __construct(string $username, string $password, string $host, int $port = 25, $protocol = 'smtp')
    {
        $transport = Transport::fromDsn("$protocol://$username:$password@$host:$port?verify_peer=0");
        $this->mailer = new Mailer($transport);
    }

    /**
     * @param string $fromAddress     //发件人地址
     * @param string $toAddress       //收件人地址
     * @param string $subject           //主题
     * @param string $body              //内容
     * @return array
     */
    public function send(string $fromAddress, string $toAddress, string $subject, string $body): array
    {
        $email = (new EmailService())
            ->from($fromAddress)
            ->to($toAddress)
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject($subject)
            ->html($body);
        try {
            $this->mailer->send($email);
            return ['code' => 1, 'msg' => '发送成功'];
        } catch (TransportExceptionInterface $e) {
            return ['code' => -2, 'msg' => '发送异常', 'err' => $e->getMessage()];
        }
    }

    /**
     * @param string $fromAddress     //发件人地址
     * @param string $toAddress       //收件人地址
     * @param string $subject           //主题
     * @param string $body              //内容
     * @return array
     */
    public function sendText(string $fromAddress, string $toAddress, string $subject, string $body): array
    {
        $email = (new EmailService())
            ->from($fromAddress)
            ->to($toAddress)
            //->cc('cc@example.com')
            //->bcc('bcc@example.com')
            //->replyTo('fabien@example.com')
            //->priority(Email::PRIORITY_HIGH)
            ->subject($subject)
            ->text($body);
        try {
            $this->mailer->send($email);
            return ['code' => 1, 'msg' => '发送成功'];
        } catch (TransportExceptionInterface $e) {
            return ['code' => -2, 'msg' => '发送异常', 'err' => $e->getMessage()];
        }
    }

}