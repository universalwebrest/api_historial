<?php

defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/libraries/REST_Controller.php';
require_once APPPATH . '/libraries/Format.php';

class Rest_server extends CI_Controller {

    public function index()
    {
        $this->load->helper('url');
        
        $this->load->view('rest_server');
    }

}
